import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtResponse} from './jwt-response';

@Injectable({
  providedIn: 'root'
})
export class SocialloginService {
  private socialUrl = environment.apiUrl + 'auth/socialLogin';

  constructor(private http: HttpClient) {
  }

  SavesResponse(response): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.socialUrl, response);
  }
}
