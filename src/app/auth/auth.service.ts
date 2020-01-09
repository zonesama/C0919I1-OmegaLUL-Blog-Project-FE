import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginForm} from './login-form';
import {Observable} from 'rxjs';
import {JwtResponse} from './jwt-response';
import {SignUpForm} from './sign-up-form';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TokenStorageService} from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/auth/signin';
  private signupUrl = 'http://localhost:8080/api/auth/signup';

  constructor(private http: HttpClient,
              private jwtHelperService: JwtHelperService,
              private token: TokenStorageService) {
  }

  signIn(credentials: LoginForm): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpForm): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }
  isAuthenticated(): boolean {
    const token = this.token.getToken();
    return !this.jwtHelperService.isTokenExpired(token);
  }
}
