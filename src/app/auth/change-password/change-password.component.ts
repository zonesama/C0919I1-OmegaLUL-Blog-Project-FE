import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../token-storage.service';
import {LoginForm} from '../login-form';
import {AuthServiceNormal} from '../auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePassForm: FormGroup;
  successMessage;
  errorMessage;

  constructor(private fb: FormBuilder,
              private authService: AuthServiceNormal,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
    this.changePassForm = this.fb.group({
      currentPassword: ['', Validators.required],
      pwGroup: this.fb.group({
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmNewPassword: ['', [Validators.required, Validators.minLength(6)]]
      }, {validators: checkPassword})
    });
  }

  onSubmit() {
    this.successMessage = undefined;
    this.errorMessage = undefined;
    const loginInfo = new LoginForm(this.tokenStorageService.getUsername(), this.changePassForm.get('currentPassword').value);
    const formData = new FormData();
    formData.append('loginForm', JSON.stringify(loginInfo));
    formData.append('newPassword', this.changePassForm.get('pwGroup').get('newPassword').value);
    this.authService.changePassword(formData).subscribe(result => {
      this.successMessage = result.message;
      this.changePassForm.reset();
    }, error => {
      this.errorMessage = error.error.message;
    });
  }
}

function checkPassword(c: AbstractControl) {
  const v = c.value;
  return (v.newPassword === v.confirmNewPassword) ? null : {
    passwordnotmatch: true
  };
}

