import {User} from '../auth/user';

export class ImageBlog {
  id: number;
  tittle: string;
  description: string;
  createdDate: string;
  lastUpdatedDate: string;
  imageUrls: string;
  view: number;
  user: User;
  isPrivate: boolean;
}
