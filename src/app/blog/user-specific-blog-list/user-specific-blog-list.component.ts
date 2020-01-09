import {Component, OnDestroy, OnInit} from '@angular/core';
import {Blog} from '../blog';
import {BlogService} from '../blog.service';
import {NavigationEnd, Router} from '@angular/router';
import {DataTranferService} from '../../data-tranfer.service';

@Component({
  selector: 'app-user-specific-blog-list',
  templateUrl: './user-specific-blog-list.component.html',
  styleUrls: ['./user-specific-blog-list.component.scss']
})
export class UserSpecificBlogListComponent implements OnInit, OnDestroy {
  count = 8;
  p = 1;
  blogList: Blog[];
  navigationSubscription;

  constructor(private blogService: BlogService,
              private router: Router,
              private dataTransferService: DataTranferService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  initialiseInvites() {
    this.fetchBlogList();
  }

  ngOnInit() {
    this.fetchBlogList();
  }

  fetchBlogList() {
    const tmp = this.dataTransferService.getData();
    if (tmp === undefined) {
      this.loadBlogList();
    } else {
      this.blogList = tmp;
    }
  }

  loadBlogList() {
    this.blogService.getUserSpecificBlog().subscribe(data => {
      this.blogList = data;
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

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  searchList(event) {
    const keyword = event.target.value;
    this.blogService.getUserSpecificBlog().subscribe(data => {
      const fullBlogList: Blog[] = data;
      console.log(fullBlogList);
      let searchedBlogs = [];
      for (let item of fullBlogList) {
        if (item.tittle.toLowerCase().includes(keyword.toLowerCase())) {
          searchedBlogs.push(item);
        }
      }
      this.dataTransferService.setData(searchedBlogs);
      this.router.navigateByUrl('/blog/userBlogList');
    });
  }
}
