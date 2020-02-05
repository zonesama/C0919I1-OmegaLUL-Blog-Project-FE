import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTranferService {
  private searchedBlogs;
  private searchedOwnBlogs;
  private searchedImageBlogs;
  private socialUser;

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

  setSocialUser(data) {
    this.socialUser = data;
  }

  getSocialUser() {
    return this.socialUser;
  }

  // clearData() {
  //   this.data = undefined;
  // }

  setSearchedImageBlog(data) {
    this.searchedImageBlogs = data;
  }

  getSearchedImageBlog() {
    return this.searchedImageBlogs;
  }
}
