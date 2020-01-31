import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CommentForm} from './comment-form';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentApiUrl = environment.apiUrl + 'comments/';

  constructor(private http: HttpClient) {
  }

  addNewComment(commentForm: CommentForm): Observable<any> {
    return this.http.post<any>(this.commentApiUrl + 'newComment', commentForm);
  }

  getCommentByBlog(id: number): Observable<any> {
    return this.http.get<any>(this.commentApiUrl + 'commentByBlog/' + id);
  }
}
