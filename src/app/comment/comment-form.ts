export class CommentForm {
  comment: string;
  username: string;
  blogId: number;


  constructor(comment: string, username: string, blogId: number) {
    this.comment = comment;
    this.username = username;
    this.blogId = blogId;
  }
}
