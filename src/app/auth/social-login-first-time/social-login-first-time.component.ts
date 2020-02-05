import {Component, OnInit} from '@angular/core';
import {DataTranferService} from '../../data-tranfer.service';
import {Socialusers} from '../socialusers';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {SocialloginService} from '../sociallogin.service';
import {TokenStorageService} from '../token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-social-login-first-time',
  templateUrl: './social-login-first-time.component.html',
  styleUrls: ['./social-login-first-time.component.scss']
})
export class SocialLoginFirstTimeComponent implements OnInit {
  socialUser: Socialusers;
  extraUserInfo: FormGroup;

  constructor(private dataTransferService: DataTranferService,
              private fb: FormBuilder,
              private location: Location,
              private socialloginService: SocialloginService,
              private token: TokenStorageService,
              private router: Router) {
  }

  ngOnInit() {
    this.socialUser = this.dataTransferService.getSocialUser();
    this.extraUserInfo = this.fb.group({
      dob: [, [Validators.required]],
      gender: [, Validators.required]
    });
    console.log(this.socialUser);
  }

  submit() {
    if (confirm('Are You Sure?')) {
      const dob = this.extraUserInfo.get('dob').value;
      const gender = this.extraUserInfo.get('gender').value;
      const formData = new FormData();
      formData.append('dob', dob);
      formData.append('gender', gender);
      formData.append('socialUser', JSON.stringify(this.socialUser));
      this.socialloginService.FirstTimeLogin(formData).subscribe(data => {
        this.token.saveToken(data.accessToken);
        this.token.saveUsername(data.username);
        this.token.saveAuthorities(data.authorities);
        this.router.navigateByUrl('/').then(() => {
          window.location.reload();
        });
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
