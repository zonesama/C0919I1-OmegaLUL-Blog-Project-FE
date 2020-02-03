import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Blog} from '../blog';
import {TokenStorageService} from '../../auth/token-storage.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  @Input() blog: Blog;
  @Output() viewClicked = new EventEmitter();
  @Output() editClicked = new EventEmitter();
  @Input()requestFromHome: boolean;

  constructor(private token: TokenStorageService) {
  }

  ngOnInit() {
  }

  emitView() {
    this.viewClicked.emit();
  }

  emitEdit() {
    this.editClicked.emit();
  }

  checkUser() {
    if (this.blog.user.username === this.token.getUsername()) {
      return true;
    }
    return false;
  }
}
