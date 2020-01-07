export class SignUpForm {
  name: string;
  username: string;
  email: string;
  password: string;
  role: ['user'];

  constructor(name: string, username: string, email: string, password: string, role: ['user']) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
