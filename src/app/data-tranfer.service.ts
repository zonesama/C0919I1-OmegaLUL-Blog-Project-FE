import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTranferService {
  private data;

  constructor() {
  }

  setData(data) {
    this.data = data;
  }

  getData() {
    const tmp = this.data;
    this.clearData();
    return tmp;
  }

  clearData() {
    this.data = undefined;
  }
}