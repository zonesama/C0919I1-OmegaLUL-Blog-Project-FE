import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginForm} from './login-form';
import {Observable} from 'rxjs';
import {JwtResponse} from './jwt-response';
import {SignUpForm} from './sign-up-form';
import {TokenStorageService} from './token-storage.service';
import {environment} from '../../environments/environment';
import {User} from './user';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class AuthServiceNormal {
  private loginUrl = environment.apiUrl + 'auth/signin';
  private signupUrl = environment.apiUrl + 'auth/signup';
  private userApi = environment.apiUrl + 'auth/user';

  constructor(private http: HttpClient,
              private token: TokenStorageService) {
  }

  signIn(credentials: LoginForm): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpForm): Observable<any> {
    return this.http.post<any>(this.signupUrl, info, httpOptions);
  }

  public isAuthenticated(): boolean {
    if (sessionStorage.length === 0) {
      return false;
    }
    return true;
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.post<User>(this.userApi, username);
  }
}
