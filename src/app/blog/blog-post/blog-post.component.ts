import {Component, Input, OnInit} from '@angular/core';
import {Blog} from '../blog';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  @Input() blog: Blog;
  constructor() { }

  ngOnInit() {
  }

}
