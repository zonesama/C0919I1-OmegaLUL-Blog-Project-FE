import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageBlog} from '../image-blog';
import {TokenStorageService} from '../../auth/token-storage.service';

@Component({
  selector: 'app-image-blog-post',
  templateUrl: './image-blog-post.component.html',
  styleUrls: ['./image-blog-post.component.scss']
})
export class ImageBlogPostComponent implements OnInit {
  @Input() imageBlog: ImageBlog;
  @Output() viewClicked = new EventEmitter();
  @Output() editClicked = new EventEmitter();
  thumbnail;

  constructor(private token: TokenStorageService) {
  }

  ngOnInit() {
    const imageUrls = this.imageBlog.imageUrls.split(',');
    this.thumbnail = imageUrls[0];
  }

  checkUser() {
    if (this.imageBlog.user.username === this.token.getUsername()) {
      return true;
    }
    return false;
  }

  emitView() {
    this.viewClicked.emit();
  }

  emitEdit() {
    this.editClicked.emit();
  }
}
