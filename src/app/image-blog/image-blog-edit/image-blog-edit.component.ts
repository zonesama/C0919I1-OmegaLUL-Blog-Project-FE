import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ImageBlogService} from '../image-blog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageBlog} from '../image-blog';
import {ImageFile} from '../image-file';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-image-blog-edit',
  templateUrl: './image-blog-edit.component.html',
  styleUrls: ['./image-blog-edit.component.scss']
})
export class ImageBlogEditComponent implements OnInit {
  imageFiles: ImageFile[] = [];
  ImgBlogForm: FormGroup;
  selectedFile = [];
  imageUrls: string[];
  imageBlog: ImageBlog;
  selectedImgUrl: string[];
  errorMsg;

  constructor(private fb: FormBuilder,
              private imageBlogService: ImageBlogService,
              private router: Router,
              private route: ActivatedRoute,
              private token: TokenStorageService,
              private location: Location) {
  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.imageBlogService.getImageBlog(id).subscribe(data => {
      this.imageBlog = data;
      this.imageUrls = data.imageUrls.split(',');
      this.selectedImgUrl = data.imageUrls.split(',');
      this.ImgBlogForm = this.fb.group({
        id: [this.imageBlog.id],
        tittle: [this.imageBlog.tittle, [Validators.required]],
        description: [this.imageBlog.description, [Validators.required]],
        username: [this.token.getUsername()],
        isPrivate: [this.imageBlog.isPrivate],
        imageUrls: [this.imageBlog.imageUrls]
      });
    });
  }

  onSubmit() {
    if (confirm('Are You Sure?')) {
      const newImgUrls = this.selectedImgUrl.join(',');
      this.ImgBlogForm.controls['imageUrls'].setValue(newImgUrls);
      const formData = new FormData();
      formData.append('imageBlogInfo', JSON.stringify(this.ImgBlogForm.value));
      for (const imgfile of this.selectedFile) {
        formData.append('images', imgfile);
      }
      this.imageBlogService.updateBlog(formData).subscribe(result => {
        alert('Updated Image Blog Id: ' + result.id + ', Tittle: ' + result.tittle);
        this.router.navigateByUrl('/imgBlog').then(() => {
          window.location.reload();
        });
      }, error => {
        this.errorMsg = error.error.message;
      });
    }
  }

  onSelectedFiles(event) {
    const images = event.target.files;
    for (const img of images) {
      let founded = false;
      for (const item of this.imageFiles) {
        if (img.name === item.imgFile.name && img.type === item.imgFile.type
          && img.size === item.imgFile.size && img.lastModified === item.imgFile.lastModified) {
          founded = true;
          break;
        }
      }
      if (!founded) {
        const newImageFile = new ImageFile(img, '');
        const reader = new FileReader();
        reader.onload = e => newImageFile.imgPreviewUrl = reader.result.toString();
        reader.readAsDataURL(img);
        this.imageFiles.push(newImageFile);
        this.selectedFile.push(img);
      }
    }
  }

  onClickCheckbox(imgFile: File, checked: any) {
    if (checked) {
      this.selectedFile.push(imgFile);
    } else {
      const index = this.selectedFile.indexOf(x => x === imgFile);
      this.selectedFile.splice(index, 1);
    }
    console.log(this.selectedFile);
  }

  onClickCheckboxUrl(imgUrl: string, checked: boolean) {
    if (checked) {
      this.selectedImgUrl.push(imgUrl);
    } else {
      const index = this.selectedImgUrl.findIndex(x => x === imgUrl);
      this.selectedImgUrl.splice(index, 1);
    }
    console.log(this.selectedImgUrl);
  }

  goBack() {
    this.location.back();
  }

  deleteImageBlog() {
    if (confirm('Are You Sure?')) {
      this.imageBlogService.deleteImageBlog(this.imageBlog.id).subscribe(result => {
        alert('Deleted Image Blog with ID: ' + result.id + ', Tittle: ' + result.tittle);
        this.router.navigateByUrl('/imgBlog').then(() => {
          window.location.reload();
        });
      });
    }
  }
}
