import {DataTranferService} from '../data-tranfer.service';
import {Router} from '@angular/router';
import {BlogService} from '../blog/blog.service';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginForm} from '../auth/login-form';
import {TokenStorageService} from '../auth/token-storage.service';
import {AuthServiceNormal} from '../auth/auth.service';
import {InitBlogListDataService} from '../init-blog-list-data.service';
import {Blog} from '../blog/blog';
import {GoogleLoginProvider, FacebookLoginProvider, AuthService} from 'angular-6-social-login';
import {SocialLoginModule, AuthServiceConfig} from 'angular-6-social-login';
import {Socialusers} from '../auth/socialusers';
import {SocialloginService} from '../auth/sociallogin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  response;
  socialusers = new Socialusers();
  @ViewChild('searchInput', {static: false}) searchInput: ElementRef;
  loginInfo: FormGroup;
  loginForm: LoginForm;
  errorMessage = '';
  audioUrl = 'http://storage.googleapis.com/blogs-pj.appspot.com/zone.god.blogprojectbe/files/Sun%20Jan%2012%202020-[AudioTrimmer.com].mp3';

  constructor(private dataTransferService: DataTranferService,
              private router: Router,
              private blogService: BlogService,
              private fb: FormBuilder,
              public token: TokenStorageService,
              private authService: AuthServiceNormal,
              private initBlogListDataService: InitBlogListDataService,
              public OAuth: AuthService,
              private socialloginService: SocialloginService) {
  }

  ngOnInit() {
    this.blogService.getBlogList().subscribe(data => {
      this.initBlogListDataService.setFullBlogList(data);
    });
    this.loginInfo = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  SearchBlog(event) {
    const keyword = event.target.value;
    const blogs: Blog[] = this.initBlogListDataService.getFullBlogList();
    if (keyword === '') {
      this.dataTransferService.setSearchedBlog(blogs);
      this.router.navigateByUrl('/blog');
    } else {
      let searchedBlogLists = [];
      for (let item of blogs) {
        if (item.tittle.toLowerCase().includes(keyword.toLowerCase()) || item.content.toLowerCase().includes(keyword.toLowerCase())
          || item.description.toLowerCase().includes(keyword.toLowerCase())) {
          searchedBlogLists.push(item);
        }
      }
      this.dataTransferService.setSearchedBlog(searchedBlogLists);
      this.router.navigateByUrl('/blog');
    }
  }

  goToNewBlog() {
    this.router.navigateByUrl('/blog/newBlog');
  }

  goToBlogList() {
    this.router.navigateByUrl('/blog/userBlogList');
  }

  onLoginButtonClicked() {
    document.getElementById('modalRegisterForm');
  }

  onSubmit() {
    this.loginForm = this.loginInfo.value;
    this.authService.signIn(this.loginForm).subscribe(data => {
      this.token.saveToken(data.accessToken);
      this.token.saveUsername(data.username);
      this.token.saveAuthorities(data.authorities);
      // @ts-ignore
      new Audio(this.audioUrl).play().then(setTimeout(() => {
        window.location.reload();
      }, 1300));
    }, error => {
      if (error.error.message === 'Error -> Unauthorized') {
        this.errorMessage = 'Wrong Password';
      } else {
        this.errorMessage = error.error.message;
      }
    });
  }

  logOut() {
    if (confirm('Are You Sure ?')) {
      this.token.signOut();
      window.location.reload();
    }
  }

  isLoggedIn() {
    if (sessionStorage.length === 0) {
      return false;
    }
    return true;
  }

  socialSignIn(socialProvider: string) {
    let socialPlatformProvider;
    if (socialProvider === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialProvider === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.OAuth.signIn(socialPlatformProvider).then(socialusers => {
      // console.log(socialProvider, socialusers);
      // console.log(socialusers);
      this.socialloginService.SavesResponse(socialusers).subscribe(data => {
        this.token.saveToken(data.accessToken);
        this.token.saveUsername(data.username);
        this.token.saveAuthorities(data.authorities);
        window.location.reload();
      });
    });
  }

  goToNewImgBlog() {
    this.router.navigateByUrl('imgBlog/newImgBlog');
  }

  goToImgBlogList() {
    this.router.navigateByUrl('imgBlog/imgBlogList');
  }
}

