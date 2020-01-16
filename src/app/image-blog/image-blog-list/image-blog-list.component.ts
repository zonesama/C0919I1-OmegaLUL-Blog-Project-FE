import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {DataTranferService} from '../../data-tranfer.service';
import {InitBlogListDataService} from '../../init-blog-list-data.service';
import {ImageBlog} from '../image-blog';

@Component({
  selector: 'app-image-blog-list',
  templateUrl: './image-blog-list.component.html',
  styleUrls: ['./image-blog-list.component.scss']
})
export class ImageBlogListComponent implements OnInit, OnDestroy {
  imageBlogList: ImageBlog[];
  p = 1;
  count = 8;
  navigationSubscription;

  constructor(private router: Router,
              private dataTransferService: DataTranferService,
              private initBlogListDataService: InitBlogListDataService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  ngOnInit() {
  }

  private initialiseInvites() {
    this.fetchBlogList();
  }

  private fetchBlogList() {
    const tmp = this.dataTransferService.getSearchedImageBlog();
    if (tmp === undefined) {
      this.loadBlogList();
    } else {
      this.imageBlogList = tmp;
    }
  }

  goToBlogDetail(item: ImageBlog) {
  }

  goToEditBlog(item: ImageBlog) {

  }

  private loadBlogList() {
    this.imageBlogList = this.initBlogListDataService.getFullImageBlogList();
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  searchList($event: Event) {
  }
}
