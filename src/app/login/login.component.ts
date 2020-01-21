import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthServiceNormal} from '../auth/auth.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoginForm} from '../auth/login-form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginInfo: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginForm: LoginForm;

  constructor(private router: Router,
              private authService: AuthServiceNormal,
              private tokenStorageService: TokenStorageService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.loginInfo = this.fb.group({
      username: [],
      password: []
    });
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getAuthorities();
    }
  }

  onSubmit() {
    this.loginForm = this.loginInfo.value;
    this.authService.signIn(this.loginForm).subscribe(data => {
      this.tokenStorageService.saveToken(data.accessToken);
      this.tokenStorageService.saveUsername(data.username);
      this.tokenStorageService.saveAuthorities(data.authorities);
      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getAuthorities();
      window.location.reload();
    });
  }
}
