import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ImageBlogService} from '../image-blog.service';
import {ImageFile} from '../image-file';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {InitBlogListDataService} from '../../init-blog-list-data.service';

@Component({
  selector: 'app-image-blog-create',
  templateUrl: './image-blog-create.component.html',
  styleUrls: ['./image-blog-create.component.scss']
})
export class ImageBlogCreateComponent implements OnInit {
  imageFiles: ImageFile[] = [];
  newImgBlogForm: FormGroup;
  selectedFile = [];
  errorMsg;

  constructor(private fb: FormBuilder,
              private imageBlogService: ImageBlogService,
              private token: TokenStorageService,
              private router: Router,
              private location: Location,
              private initBlogListDataService: InitBlogListDataService) {
  }

  ngOnInit() {
    this.newImgBlogForm = this.fb.group({
      tittle: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imageUrls: [''],
      username: [this.token.getUsername()],
      isPrivate: []
    })
    ;
  }

  onSubmit() {
    // console.log(this.selectedFile);
    if (confirm('Are You Sure?')) {
      const imageBlogForm = this.newImgBlogForm.value;
      const formData = new FormData();
      formData.append('imageBlogInfo', JSON.stringify(imageBlogForm));
      for (const file of this.selectedFile) {
        formData.append('images', file);
      }
      this.imageBlogService.createNewImageBlog(formData).subscribe(result => {
        const imageBlog = result;
        alert('Created new Image Blog with Tiitle: ' + imageBlog.tittle);
        this.imageBlogService.getFullImageBlog().subscribe(data => {
          this.initBlogListDataService.setFullImageBlogList(data);
          this.router.navigateByUrl('/imgBlog').then(() => {
            window.location.reload();
          });
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

  onClickCheckbox(img: File, checked: boolean) {
    if (checked) {
      this.selectedFile.push(img);
    } else {
      const index = this.selectedFile.indexOf(x => x === img);
      this.selectedFile.splice(index, 1);
    }
    console.log(this.selectedFile);
  }

  goBack() {
    this.location.back();
  }
}

