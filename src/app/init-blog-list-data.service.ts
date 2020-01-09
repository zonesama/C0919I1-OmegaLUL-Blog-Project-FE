import {Injectable} from '@angular/core';
import {Blog} from './blog/blog';

@Injectable({
  providedIn: 'root'
})
export class InitBlogListDataService {
  private fullBlogList;
  private userFullBlogList;

  constructor() {
  }

  setFullBlogList(data) {
    this.fullBlogList = data;
  }

  getFullBlogList() {
    return this.fullBlogList;
  }

  setUserFullBlogList(data) {
    this.userFullBlogList = data;
  }

  getUserFullBlogList() {
    return this.userFullBlogList;
  }
}
