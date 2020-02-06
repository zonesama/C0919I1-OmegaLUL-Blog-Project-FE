export class SignUpForm {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  dob: Date;
  gender: string;
  role: string[];

  constructor(id: number, name: string, username: string, email: string, password: string, avatar: string, dob: Date,
              gender: string, role: string[]) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    this.dob = dob;
    this.gender = gender;
    this.role = role;
  }
}
