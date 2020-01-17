import {Tag} from './tag';
import {User} from '../auth/user';

export class ImageBlog {
  id: number;
  tittle: string;
  thumbnail: string;
  description: string;
  tagList: Tag[];
  createdDate: Date;
  lastUpdatedDate: Date;
  imageUrls: string;
  user: User;
  isPrivate: boolean;
}
