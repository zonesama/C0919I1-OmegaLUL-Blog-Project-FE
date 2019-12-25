import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Blog} from '../blog';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  @Input() blog: Blog;
  @Output() viewClicked = new EventEmitter();
  @Output() editClicked = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  emitView() {
    this.viewClicked.emit();
  }

  emitEdit() {
    this.editClicked.emit();
  }
}
