import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {DataTranferService} from '../../data-tranfer.service';
import {InitBlogListDataService} from '../../init-blog-list-data.service';
import {ImageBlog} from '../image-blog';
import {ImageBlogService} from '../image-blog.service';

@Component({
  selector: 'app-image-blog-list',
  templateUrl: './image-blog-list.component.html',
  styleUrls: ['./image-blog-list.component.scss']
})
export class ImageBlogListComponent implements OnInit, OnDestroy {
  imageBlogList: ImageBlog[];
  imageFullBlogList: ImageBlog[];
  p = 1;
  count = 9;
  navigationSubscription;

  constructor(private router: Router,
              private dataTransferService: DataTranferService,
              private initBlogListDataService: InitBlogListDataService,
              private imageBlogService: ImageBlogService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  ngOnInit() {
    this.imageBlogService.getFullImageBlog().subscribe(data => {
      this.imageBlogList = data;
    });
  }

  private initialiseInvites() {
    this.fetchBlogList();
  }

  private fetchBlogList() {
    this.imageBlogList = this.initBlogListDataService.getFullImageBlogList();
  }

  goToBlogDetail(item: ImageBlog) {
    this.router.navigateByUrl('/imgBlog/imgBlogDetails/' + item.id);
  }

  goToEditBlog(item: ImageBlog) {
    this.router.navigateByUrl('/imgBlog/updateImgBlog/' + item.id);
  }

  private loadBlogList() {
    this.imageBlogList = this.initBlogListDataService.getFullImageBlogList();
    this.imageFullBlogList = this.initBlogListDataService.getFullImageBlogList();
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  searchList(event) {
    let tmp: ImageBlog[] = [];
    for (const item of this.imageFullBlogList) {
      if (item.tittle.toLowerCase().includes(event.target.value.toLowerCase())) {
        tmp.push(item);
      }
    }
    this.imageBlogList = tmp;
  }
}
