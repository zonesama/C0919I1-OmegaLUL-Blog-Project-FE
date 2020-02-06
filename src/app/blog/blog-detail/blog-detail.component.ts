import {Component, OnInit} from '@angular/core';
import {Blog} from '../blog';
import {ActivatedRoute, Router} from '@angular/router';
import {faFacebookSquare} from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import {faTwitterSquare} from '@fortawesome/free-brands-svg-icons/faTwitterSquare';
import {faGoogle} from '@fortawesome/free-brands-svg-icons/faGoogle';
import {BlogService} from '../blog.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Location} from '@angular/common';
import {CommentForm} from '../../comment/comment-form';
import {CommentService} from '../../comment/comment.service';


@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  fbIcon = faFacebookSquare;
  tweetIcon = faTwitterSquare;
  ggIcon = faGoogle;
  blog: Blog;
  tags = 'Tags: ';
  commentList: Comment[];
  errorMessage;
  count = 6;
  p = 0;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private blogService: BlogService,
              private tokenStorageService: TokenStorageService,
              private location: Location,
              private commentService: CommentService) {
  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.blogService.getBlogById(id).subscribe(data => {
      this.blog = data;
      for (let item of this.blog.tagList) {
        this.tags += item.name + ', ';
      }
      this.tags = this.tags.substring(0, this.tags.length - 2);
      this.fetchComment();
    });
  }

  ShareOnGmail() {
    const shareUrl = window.location.href;
    const shareSubJect = this.blog.tittle;
    const url = 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=' + shareSubJect + '&body=' + shareUrl + '&ui=2&tf=1&pli=1';

    window.open(url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
  }

  isLoggedInAuthor() {
    if (this.blog.user.username === this.tokenStorageService.getUsername()) {
      return true;
    }
    return false;
  }

  isLoggedIn() {
    if (sessionStorage.length !== 0) {
      return true;
    }
    return false;
  }

  checkPrivate() {
    if (this.blog.user.username === this.tokenStorageService.getUsername() || !this.blog.isPrivate) {
      return false;
    } else if (this.blog.user.username !== this.tokenStorageService.getUsername() && this.blog.isPrivate) {
      return true;
    }
  }

  goBack() {
    this.location.back();
  }

  fetchComment() {
    this.commentService.getCommentByBlog(this.blog.id).subscribe(data => {
      this.commentList = data;
      // @ts-ignore
      this.commentList.sort((a, b) => a.id - b.id);
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

  postComment() {
    if (confirm('Are You Sure?')) {
      // @ts-ignore
      const comment = document.getElementById('comment').value;
      // @ts-ignore
      document.getElementById('comment').value = '';
      const commentForm = new CommentForm(comment, this.tokenStorageService.getUsername(), this.blog.id);
      this.commentService.addNewComment(commentForm).subscribe(result => {
        this.fetchComment();
      });
    }
  }
}
