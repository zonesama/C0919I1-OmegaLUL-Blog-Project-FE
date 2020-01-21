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
  tagSearchedList: Blog[];
  textSearchedList: Blog[];
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
      this.tagSearchedList = data;
      this.textSearchedList = data;
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
    const fullBlogList = this.initBlogListDataService.getFullBlogList();
    const searchedTextBlogs: Blog[] = [];
    const finalSearchedBlog: Blog[] = [];
    if (checked) {
      this.selectedTags.push(id);
    } else {
      const index = this.selectedTags.indexOf(id);
      this.selectedTags.splice(index, 1);
    }
    // @ts-ignore
    searchText(fullBlogList, searchedTextBlogs, document.getElementById('textSearch').value);
    searchTag(searchedTextBlogs, finalSearchedBlog, this.selectedTags);
    this.blogList = finalSearchedBlog;
  }

  searchList(event) {
    const keyword = event.target.value;
    const fullBlogList = this.initBlogListDataService.getFullBlogList();
    const searchedTagBlog: Blog[] = [];
    const finalSearchBlog: Blog[] = [];
    searchTag(fullBlogList, searchedTagBlog, this.selectedTags);
    searchText(searchedTagBlog, finalSearchBlog, keyword);
    this.blogList = finalSearchBlog;
  }
}

function searchTag(BlogList: Blog[], searchedBlogs: Blog[], selectedTags: number[]) {
  for (const item of BlogList) {
    let count = 0;
    // tslint:disable-next-line:max-line-length
    for (const tag of item.tagList) {
      for (const tagId of selectedTags) {
        if (tag.id === tagId) {
          count++;
        }
      }
    }
    if (count === selectedTags.length) {
      searchedBlogs.push(item);
    }
  }
}

function searchText(BlogList: Blog[], searchedBlogs: Blog[], keyword: string) {
  for (const item of BlogList) {
    if (item.tittle.toLowerCase().includes(keyword.toLowerCase())
      || item.description.toLowerCase().includes(keyword.toLowerCase())
      || item.content.toLowerCase().includes(keyword.toLowerCase())) {
      searchedBlogs.push(item);
    }
  }
}
