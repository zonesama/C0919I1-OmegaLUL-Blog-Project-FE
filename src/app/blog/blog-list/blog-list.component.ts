import {Component, OnInit} from '@angular/core';
import {Blog} from '../blog';
import {BlogService} from '../blog.service';
import {Router} from '@angular/router';
import {DataTranferService} from '../../data-tranfer.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  blogList: Blog[];
  count = 9;
  p = 1;

  constructor(private blogService: BlogService,
              private router: Router,
              private dataTransferService: DataTranferService) {
  }

  ngOnInit() {
    this.loadBlogList();
  }

  loadBlogList() {
    this.blogService.getBlogList().subscribe(data => {
      this.blogList = data;
    });
  }

  goToBlogDetail(item: Blog) {
    this.dataTransferService.setData(item);
    this.router.navigateByUrl('/blog/blogDetail');
  }

  goToEditBlog(item: Blog) {
    this.dataTransferService.setData(item);
    this.router.navigateByUrl('/blog/editBlog');
  }
}
