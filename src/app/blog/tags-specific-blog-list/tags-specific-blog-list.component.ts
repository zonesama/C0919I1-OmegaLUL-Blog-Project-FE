import {Component, OnInit} from '@angular/core';
import {BlogService} from '../blog.service';
import {Tag} from '../tag';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataTranferService} from '../../data-tranfer.service';
import {InitBlogListDataService} from '../../init-blog-list-data.service';
import {Blog} from '../blog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tags-specific-blog-list',
  templateUrl: './tags-specific-blog-list.component.html',
  styleUrls: ['./tags-specific-blog-list.component.scss']
})
export class TagsSpecificBlogListComponent implements OnInit {
  tagList: Tag[];
  blogList: Blog[];
  selectedTags = [];
  count = 8;
  p = 1;
  navigationSubscription;

  constructor(
    private router: Router,
    private blogService: BlogService,
    private dataTransferService: DataTranferService,
    private initBlogListDataService: InitBlogListDataService
  ) {
  }

  ngOnInit() {
    this.loadTagList();
    this.blogService.getBlogList().subscribe(data => {
      this.initBlogListDataService.setFullBlogList(data);
      this.fetchBlogList();
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

  fetchBlogList() {
    const tmp = this.dataTransferService.getSearchedBlog();
    if (tmp === undefined) {
      this.loadBlogList();
    } else {
      this.blogList = tmp;
    }
  }


  loadTagList() {
    this.blogService.getTag().subscribe(data => {
      this.tagList = data;
    });
  }

  loadBlogList() {
    this.blogList = this.initBlogListDataService.getFullBlogList();
  }

  onChangeBox(id: number, checked: boolean) {
    const fullBlogList: Blog[] = this.initBlogListDataService.getFullBlogList();
    const searchedBlogs = [];
    if (checked) {
      this.selectedTags.push(id);
    } else {
      const index = this.selectedTags.indexOf(id);
      this.selectedTags.splice(index, 1);
    }
    for (const item of fullBlogList) {
      let count = 0;
      // tslint:disable-next-line:max-line-length
      for (const tag of item.tagList) {
        for (const tagId of this.selectedTags) {
          if (tag.id === tagId) {
            count++;
          }
        }
      }
      if (count === this.selectedTags.length) {
        searchedBlogs.push(item);
      }
    }
    this.blogList = searchedBlogs;
    // this.dataTransferService.setSearchedOwnBlog(this.selectedTags);
    // this.router.navigateByUrl('/blog/tagsSearch');
  }
}
