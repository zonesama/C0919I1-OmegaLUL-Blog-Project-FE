import {Component, OnInit} from '@angular/core';
import {ImageBlog} from '../image-blog';
import {ActivatedRoute, Router} from '@angular/router';
import {faFacebookSquare} from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import {faTwitterSquare} from '@fortawesome/free-brands-svg-icons/faTwitterSquare';
import {faGoogle} from '@fortawesome/free-brands-svg-icons/faGoogle';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Location} from '@angular/common';
import {ImageBlogService} from '../image-blog.service';


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
  imageUrls;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private imageBlogService: ImageBlogService,
              private tokenStorageService: TokenStorageService,
              private location: Location) {
  }

  ngOnInit() {
    // tslint:disable-next-line:radix
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.imageBlogService.getImageBlog(id).subscribe(data => {
      this.imageBlog = data;
      this.imageUrls = this.imageBlog.imageUrls.split(',');
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

  goBack() {
    this.location.back();
  }

  w3_close() {
    const sideBar = document.getElementById('mySidebar');
    const navBar = document.getElementById('myNavBar');
    const footer = document.getElementById('myFooter');
    if (navBar.style.display === 'none') {
      sideBar.style.display = 'block';
      navBar.style.display = '';
      footer.style.display = '';
    } else {
      sideBar.style.display = 'none';
      navBar.style.display = 'none';
      footer.style.display = 'none';
    }
  }
}
