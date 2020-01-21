import {User} from '../auth/user';

export class ImageBlog {
   id: number;
   tittle: string;
   description: string;
   createdDate: string;
   lastUpdatedDate: string;
   imageUrls: string;
   user: User;
   isPrivate: boolean;
}
