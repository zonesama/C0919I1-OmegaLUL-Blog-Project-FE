import {Component, OnInit} from '@angular/core';
import {BlogService} from '../blog/blog.service';

@Component({
  selector: 'app-test-upload',
  templateUrl: './test-upload.component.html',
  styleUrls: ['./test-upload.component.scss']
})
export class TestUploadComponent implements OnInit {
  imagesUrl: string[];
  images: File[];

  constructor(private blogService: BlogService) {
  }

  ngOnInit() {
  }

  getImgs(event) {
    const images = event.target.files;
    this.images = images;
  }

  Submit() {
    let formData = new FormData();
    for (const item of this.images) {
      formData.append('upload', item);
    }
    this.blogService.uploadMultipleImage(formData).subscribe(result => {
      this.imagesUrl = result;
      console.log(this.imagesUrl);
    });
  }
}
