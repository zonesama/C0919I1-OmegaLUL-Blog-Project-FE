import {Tag} from './tag';
import {User} from '../auth/user';

export class Blog {
  id: number;
  tittle: string;
  description: string;
  thumbnail: string;
  tagList: Tag[];
  content: string;
  createdDate: Date;
  lastUpdatedDate: Date;
  user: User;
  isPrivate: boolean;
}
