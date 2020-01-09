export class BlogForm {
  id: number;
  tittle: string;
  description: string;
  thumbnail: string;
  tagList: number[];
  content: string;
  username: string;
  isPrivate: boolean;

  constructor(id: number, tittle: string, description: string, thumbnail: string, tagList: number[],
              content: string, username: string, isPrivate: boolean) {
    this.id = id;
    this.tittle = tittle;
    this.description = description;
    this.thumbnail = thumbnail;
    this.tagList = tagList;
    this.content = content;
    this.username = username;
    this.isPrivate = isPrivate;
  }
}
