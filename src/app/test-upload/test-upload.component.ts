import {Component, OnInit} from '@angular/core';
import {BlogService} from '../blog/blog.service';

@Component({
  selector: 'app-test-upload',
  templateUrl: './test-upload.component.html',
  styleUrls: ['./test-upload.component.scss']
})
export class TestUploadComponent implements OnInit {
  imagesUrl = [];
  images = [];

  constructor(private blogService: BlogService) {
  }

  ngOnInit() {
  }

  getImgs(event) {
    const images = event.target.files;
    for (let img of images) {
      this.images.push(img);
      const reader = new FileReader();
      reader.onload = e => this.imagesUrl.push(reader.result);
      reader.readAsDataURL(img);
    }
    console.log(images.findIndex(0));
  }

  Submit() {
    console.log(this.images);
    console.log(this.imagesUrl);
    // let formData = new FormData();
    // for (const item of this.images) {
    //   formData.append('upload', item);
    // }
    // this.blogService.uploadMultipleImage(formData).subscribe(result => {
    //   this.imagesUrl = result;
    //   console.log(this.imagesUrl);
    // });
  }
}
