import {Component, OnInit} from '@angular/core';
import {BlogService} from '../blog/blog.service';
import {Tag} from '../blog/tag';
import {Blog} from '../blog/blog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  page = 1;
  tagList: Tag[];
  blogList: Blog[];
  fullBlogList: Blog[];
  count = 4;
  selectedTag;

  constructor(private blogService: BlogService,
              private router: Router) {
  }

  ngOnInit() {
    this.blogService.getTag().subscribe(data => {
      this.tagList = data;
      this.tagList.unshift(new Tag(-1, 'All'));
    });
    this.blogService.getTopViewBlogByTag(-1).subscribe(data => {
      this.fullBlogList = data;
      this.blogList = this.fullBlogList.slice(1, this.fullBlogList.length);
    });
    this.selectedTag = 'All';
  }

  getTags(current: number) {
    return this.tagList[current - 1];
  }

  getTopBlogByTag(id: number) {
    for (const tag of this.tagList) {
      if (tag.id === id) {
        this.selectedTag = tag.name;
        break;
      }
    }
    this.blogService.getTopViewBlogByTag(id).subscribe(data => {
      this.fullBlogList = data;
      this.blogList = this.fullBlogList.slice(1, this.fullBlogList.length);
    });
  }

  goToBlogDetail(item: Blog) {
    // this.dataTransferService.setData(item);
    this.router.navigateByUrl('/blog/blogDetail/' + item.id);
  }

  goToEditBlog(item: Blog) {
    // this.dataTransferService.setData(item);
    this.router.navigateByUrl('/blog/editBlog/' + item.id);
  }
}
