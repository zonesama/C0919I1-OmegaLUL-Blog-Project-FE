import {DataTranferService} from '../data-tranfer.service';
import {Router} from '@angular/router';
import {BlogService} from '../blog/blog.service';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoginForm} from '../auth/login-form';
import {TokenStorageService} from '../auth/token-storage.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('searchInput', {static: false}) searchInput: ElementRef;
  loginInfo: FormGroup;
  loginForm: LoginForm;

  constructor(private dataTransferService: DataTranferService,
              private router: Router,
              private blogService: BlogService,
              private fb: FormBuilder,
              private token: TokenStorageService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.loginInfo = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  SearchBlog(event) {
    const keyword = event.target.value;
    if (keyword === '') {
      this.blogService.getBlogList().subscribe(data => {
        const blogs = data;
        this.dataTransferService.setData(blogs);
        this.router.navigateByUrl('/blog');
      });
    } else {
      this.blogService.searchBlogByName(keyword).subscribe(data => {
        const blogs = data;
        this.dataTransferService.setData(blogs);
        this.router.navigateByUrl('/blog');
      });
    }
  }

  goToNewBlog() {
    this.router.navigateByUrl('/blog/newBlog');
  }

  goToBlogList() {
    this.blogService.getBlogList().subscribe(data => {
      this.searchInput.nativeElement.value = '';
      const blogs = data;
      this.dataTransferService.setData(blogs);
      this.router.navigateByUrl('/blog');
    });
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
