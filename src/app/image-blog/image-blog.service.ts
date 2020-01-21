import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ImageBlog} from './image-blog';

@Injectable({
  providedIn: 'root'
})
export class ImageBlogService {
  private ApiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  createNewImageBlog(formData: FormData): Observable<ImageBlog> {
    return this.http.post<ImageBlog>(this.ApiUrl + 'newImageBlog', formData);
  }

  getFullImageBlog(): Observable<ImageBlog[]> {
    return this.http.get<ImageBlog[]>(this.ApiUrl + 'imagBlogList');
  }

  getImageBlog(id: number): Observable<ImageBlog> {
    return this.http.get<ImageBlog>(this.ApiUrl + 'imageBlog/' + id);
  }

  deleteImageBlog(id: number): Observable<ImageBlog> {
    return this.http.delete<ImageBlog>(this.ApiUrl + 'deleteImgBlog/' + id);
  }

  updateBlog(formData: FormData) {
    return this.http.put<ImageBlog>(this.ApiUrl + 'updateImgBlog', formData);
  }
}
