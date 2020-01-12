import {DataTranferService} from '../data-tranfer.service';
import {Router} from '@angular/router';
import {BlogService} from '../blog/blog.service';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginForm} from '../auth/login-form';
import {TokenStorageService} from '../auth/token-storage.service';
import {AuthService} from '../auth/auth.service';
import {InitBlogListDataService} from '../init-blog-list-data.service';
import {Blog} from '../blog/blog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('searchInput', {static: false}) searchInput: ElementRef;
  loginInfo: FormGroup;
  loginForm: LoginForm;
  errorMessage = '';

  constructor(private dataTransferService: DataTranferService,
              private router: Router,
              private blogService: BlogService,
              private fb: FormBuilder,
              public token: TokenStorageService,
              private authService: AuthService,
              private initBlogListDataService: InitBlogListDataService) {
  }

  ngOnInit() {
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
        if (item.tittle.toLowerCase().includes(keyword.toLowerCase())) {
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
      window.location.reload();
    }, error => {
      if(error.error.message === 'Error -> Unauthorized'){
        this.errorMessage = 'Wrong Password';
      }else{
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
}
