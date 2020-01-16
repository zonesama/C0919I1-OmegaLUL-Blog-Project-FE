import {Component, OnInit} from '@angular/core';
import {InitBlogListDataService} from './init-blog-list-data.service';
import {BlogService} from './blog/blog.service';
import {ImageBlogService} from './image-blog/image-blog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Blog-Project-FE';

  constructor(private initBlogListDataService: InitBlogListDataService,
              private blogService: BlogService,
              private imageBlogService: ImageBlogService) {
  }

  ngOnInit() {
    this.blogService.getBlogList().subscribe(data => {
      this.initBlogListDataService.setFullBlogList(data);
    });
    this.imageBlogService.getFullImageBlog().subscribe(data => {
      this.initBlogListDataService.setFullImageBlogList(data);
    });
  }
}
