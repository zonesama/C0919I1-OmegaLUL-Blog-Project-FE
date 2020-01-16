import { Component, OnInit } from '@angular/core';
import {ImageBlog} from '../image-blog';
import {ActivatedRoute, Router} from '@angular/router';
import {faFacebookSquare} from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import {faTwitterSquare} from '@fortawesome/free-brands-svg-icons/faTwitterSquare';
import {faGoogle} from '@fortawesome/free-brands-svg-icons/faGoogle';
import {BlogService} from '../blog.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-image-blog-detail',
  templateUrl: './image-blog-detail.component.html',
  styleUrls: ['./image-blog-detail.component.scss']
})
export class ImageBlogDetailComponent implements OnInit {
  fbIcon = faFacebookSquare;
  tweetIcon = faTwitterSquare;
  ggIcon = faGoogle;
  imageBlog: ImageBlog;
  tags = 'Tags: ';


  constructor(private router: Router,
              private route: ActivatedRoute,
              private imageBlogService: BlogService,
              private tokenStorageService: TokenStorageService,
              private location: Location) { }

  ngOnInit() {
    // tslint:disable-next-line:radix
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.imageBlogService.getBlogById(id).subscribe(data => {
      this.imageBlog = data;
      for (let item of this.imageBlog.tagList) {
        this.tags += item.name + ', ';
      }
      this.tags = this.tags.substring(0, this.tags.length - 2);
    });
  }
  checkPrivate() {
    if (this.imageBlog.user.username === this.tokenStorageService.getUsername() || !this.imageBlog.isPrivate) {
      return false;
    } else if (this.imageBlog.user.username !== this.tokenStorageService.getUsername() && this.imageBlog.isPrivate) {
      return true;
    }
  }

  ShareOnGmail() {
    const shareUrl = window.location.href;
    const shareSubJect = this.imageBlog.tittle;
    const url = 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=' + shareSubJect + '&body=' + shareUrl + '&ui=2&tf=1&pli=1';

    window.open(url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
  }

  isLoggedIn() {
    if (this.imageBlog.user.username === this.tokenStorageService.getUsername()) {
      return true;
    }
    return false;
  }

  goBack() {
    this.location.back();
  }
}
