import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../user';
import {AuthServiceNormal} from '../auth.service';
import {TokenStorageService} from '../token-storage.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-change-user-info',
  templateUrl: './change-user-info.component.html',
  styleUrls: ['./change-user-info.component.scss']
})
export class ChangeUserInfoComponent implements OnInit {
  changeInfoForm: FormGroup;
  currentUser: User;
  avatarPreviewUrl;
  avatarFile;
  errorMessage;

  constructor(private fb: FormBuilder,
              private authService: AuthServiceNormal,
              private token: TokenStorageService,
              private location: Location) {
  }

  ngOnInit() {
    this.changeInfoForm = this.fb.group({
      name: ['', [Validators.required]],
      avatarUrl: ['', [Validators.required]]
    });
    this.authService.getUserByUsername(this.token.getUsername()).subscribe(result => {
      this.currentUser = result;
      // document.getElementById('avatarUrl').value = this.currentUser.avatar;
      this.changeInfoForm.get('avatarUrl').setValue(this.currentUser.avatar);
      this.changeInfoForm.get('name').setValue(this.currentUser.name);
      this.avatarPreviewUrl = this.currentUser.avatar;
    });
  }

  uploadAvatar() {
    const formData = new FormData();
    formData.append('avatarImg', this.avatarFile);
    console.log(formData);
    this.authService.uploadAvatar(formData).subscribe(data => {
      console.log(data);
      this.avatarPreviewUrl = data;
      this.changeInfoForm.get('avatarUrl').setValue(data);
    });
  }

  addAvatarFile(event) {
    const avatarFile: File = event.target.files[0];
    console.log(avatarFile);
    this.avatarFile = avatarFile;
    const reader = new FileReader();
    reader.onload = e => this.avatarPreviewUrl = reader.result.toString();
    reader.readAsDataURL(avatarFile);
  }

  addAvatarUrl(event) {
    const avatarUrl = event.target.value;
    this.avatarPreviewUrl = avatarUrl;
  }

  Submit() {
    if (confirm('Are You Sure?')) {
      const formData = new FormData();
      formData.append('name', this.changeInfoForm.get('name').value);
      formData.append('avatarUrl', this.changeInfoForm.get('avatarUrl').value);
      formData.append('username', this.token.getUsername());
      this.authService.changeUserInfo(formData).subscribe(result => {
        alert(result.message);
        window.location.reload();
      }, error => {
        this.errorMessage = error.error.message;
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
