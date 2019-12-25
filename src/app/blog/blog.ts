import {Tag} from './tag';

export class Blog {
  id: number;
  tittle: string;
  description: string;
  thumbnail: string;
  tagList: Tag[];
  content: string;
  createdDate: Date;
  lastUpdatedDate: Date;
}
