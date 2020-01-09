import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tag} from './tag';
import {Blog} from './blog';
import {BlogForm} from './blog-form';
import {TokenStorageService} from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private ApiUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient,
              private token: TokenStorageService) {
  }

  getTag(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.ApiUrl + 'tagList');
  }

  createNewBlog(blogForm: BlogForm): Observable<Blog> {
    return this.http.post<Blog>(this.ApiUrl + 'newBlog', blogForm);
  }

  getBlogList(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.ApiUrl + 'blogList');
  }

  updateBlog(blogForm: BlogForm): Observable<Blog> {
    return this.http.put<Blog>(this.ApiUrl + 'updateBlog', blogForm);
  }

  deleteBlog(id: number): Observable<Blog> {
    return this.http.delete<Blog>(this.ApiUrl + 'deleteBlog/' + id);
  }

  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(this.ApiUrl + 'blog/' + id);
  }

  searchBlogByName(keyword: string): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.ApiUrl + 'blog/search/' + keyword);
  }

  getUserSpecificBlog(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.ApiUrl+ 'blog/userBlogs/' + this.token.getUsername());
  }
}
