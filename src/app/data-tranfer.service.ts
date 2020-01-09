import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTranferService {
  private searchedBlogs;
  private searchedOwnBlogs;

  constructor() {
  }

  setSearchedBlog(data) {
    this.searchedBlogs = data;
  }

  getSearchedBlog() {
    return this.searchedBlogs;
  }

  setSearchedOwnBlog(data) {
    this.searchedOwnBlogs = data;
  }

  getSearchedOwnBlog() {
    return this.searchedOwnBlogs;
  }

  // clearData() {
  //   this.data = undefined;
  // }
}
