import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthServiceNormal} from '../auth.service';
import validate = WebAssembly.validate;
import {Router} from '@angular/router';
import {SignUpForm} from '../sign-up-form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage;
  result;
  avatarPreviewUrl;
  avatarFile;

  constructor(private fb: FormBuilder,
              private authService: AuthServiceNormal,
              private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      avatar: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      pwGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
      }, {validators: checkPassword})
    });
    // update form state
    this.registerForm.patchValue({
      email: 'info@example.com'
    });
  }

  onSubmit() {
    const signUpForm = new SignUpForm(0, this.registerForm.get('name').value.toString(), this.registerForm.get('username').value.toString(),
      this.registerForm.get('email').value.toString(), this.registerForm.get('pwGroup').get('password').value.toString(),
      this.registerForm.get('avatar').value.toString(), this.registerForm.get('dob').value, this.registerForm.get('gender').value,
      ['user']);
    this.authService.signUp(signUpForm).subscribe(data => {
      this.result = data.message;
      alert(this.result);
      this.router.navigateByUrl('/');
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

  uploadAvatar() {
    const formData = new FormData();
    formData.append('avatarImg', this.avatarFile);
    console.log(formData);
    this.authService.uploadAvatar(formData).subscribe(data => {
      console.log(data);
      this.avatarPreviewUrl = data;
      this.registerForm.get('avatar').setValue(data);
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
}

function checkPassword(c: AbstractControl) {
  const v = c.value;
  return (v.password === v.confirmPassword) ? null : {
    passwordnotmatch: true
  };
}


