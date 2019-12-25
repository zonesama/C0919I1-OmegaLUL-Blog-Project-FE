import {Component, OnInit} from '@angular/core';
import {Blog} from '../blog';
import {BlogService} from '../blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  blogList: Blog[];
  count = 3;
  p = 1;

  constructor(private blogService: BlogService) {
  }

  ngOnInit() {
    this.loadBlogList();
  }

  loadBlogList() {
    this.blogService.getBlogList().subscribe(data => {
      this.blogList = data;
    });
  }
}
