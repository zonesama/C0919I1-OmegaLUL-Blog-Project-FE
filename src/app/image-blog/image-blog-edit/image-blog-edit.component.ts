import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ImageBlogService} from '../image-blog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageBlog} from '../image-blog';
import {ImageFile} from '../image-file';

@Component({
  selector: 'app-image-blog-edit',
  templateUrl: './image-blog-edit.component.html',
  styleUrls: ['./image-blog-edit.component.scss']
})
export class ImageBlogEditComponent implements OnInit {
  imageFiles: ImageFile[] = [];
  newImgBlogForm: FormGroup;
  selectedFile = [];
  imageUrls: string[];
  imageBlog: ImageBlog;

  constructor(private fb: FormBuilder,
              private imageBlogService: ImageBlogService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.imageBlogService.getImageBlog(id).subscribe(data => {
      this.imageBlog = data;
      this.imageUrls = data.imageUrls.split(',');
    });
  }

  onSubmit() {
    return false;
  }

  onSelectedFiles(event) {
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
}
