import {User} from '../auth/user';
import {Blog} from '../blog/blog';

export class Comment {
  id: number;
  comment: string;
  user: User;
  blog: Blog;


  constructor(id: number, comment: string, user: User, blog: Blog) {
    this.id = id;
    this.comment = comment;
    this.user = user;
    this.blog = blog;
  }
}
