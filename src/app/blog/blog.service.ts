import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tag} from './tag';
import {Blog} from './blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private ApiUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {
  }

  getTag(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.ApiUrl + 'tagList');
  }

  // createNewBlog(blog: Blog): Observable<Blog>{
  //   return this.http.post<Blog>(this.ApiUrl+'/')
  // }
}
