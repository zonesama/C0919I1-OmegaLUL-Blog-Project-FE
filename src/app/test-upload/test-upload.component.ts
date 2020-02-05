import {Component, OnInit} from '@angular/core';
import {BlogService} from '../blog/blog.service';
import {ImageFile} from '../image-blog/image-file';

@Component({
  selector: 'app-test-upload',
  templateUrl: './test-upload.component.html',
  styleUrls: ['./test-upload.component.scss']
})
export class TestUploadComponent implements OnInit {
  images = [];
  count = 5;
  p = 1;

  constructor(private blogService: BlogService) {
  }

  ngOnInit() {
  }

  getImgs(event) {
    const images = event.target.files;
    for (let img of images) {
      const imageFile = new ImageFile(img, '');
      const reader = new FileReader();
      reader.onload = e => imageFile.imgPreviewUrl = reader.result.toString();
      reader.readAsDataURL(img);
      this.images.push(imageFile);
    }
    let index = this.images.findIndex(x => x.imgFile === images[0]);
    console.log(index);
  }

  Submit() {
    console.log(this.images);
    // let formData = new FormData();
    // for (const item of this.images) {
    //   formData.append('upload', item);
    // }
    // this.blogService.uploadMultipleImage(formData).subscribe(result => {
    //   this.imagesUrl = result;
    //   console.log(this.imagesUrl);
    // });
  }

  Test() {
    // @ts-ignore
    const date: Date = document.getElementById('date').value;
    // @ts-ignore
    const gender = document.getElementById('gender').value;
    console.log(date);
    console.log(gender);
    const formData = new FormData();
    formData.append('dob', JSON.stringify(date));
    formData.append('gender', gender);
    this.blogService.sendData(formData).subscribe(data => {

    });
  }
}
