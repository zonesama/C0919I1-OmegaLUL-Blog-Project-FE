import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../auth/token-storage.service';
import {ImageBlogService} from '../image-blog.service';
import {ImageFile} from '../image-file';


@Component({
  selector: 'app-image-blog-edit',
  templateUrl: './image-blog-edit.component.html',
  styleUrls: ['./image-blog-edit.component.scss']
})
export class ImageBlogEditComponent implements OnInit {

  imageFiles = [];
  newImgBlogForm: FormGroup;
  selectedFiles = [];


  constructor(private fb: FormBuilder,
              private imageBlogService: ImageBlogService,
              private token: TokenStorageService) { }

  ngOnInit() {
    this.newImgBlogForm = this.fb.group({
      title: ['', [Validators.required]],
      imageUrls: ['', [Validators.required]],
      username: [this.token.getUsername()],
      isPrivate: []
    });
  }
  onSelectedFiles(event) {
    const images = event.target.files;
    for (const img of images) {
      const imageFile = new ImageFile(img, '');
      const reader = new FileReader();
      reader.onload = e => imageFile.imgPreviewUrl = reader.result.toString();
      reader.readAsDataURL(img);
      this.imageFiles.push(imageFile);
      this.selectedFiles.push(img);
    }
  }

  onClickCheckbox(img: File, checked: boolean) {
    if (checked) {
      this.selectedFiles.push(img);
    } else {
      const index = this.selectedFiles.indexOf(x => x === img);
      this.selectedFiles.splice(index, 1);
    }
    console.log(this.selectedFiles);
  }

  onSubmit() {}
}
