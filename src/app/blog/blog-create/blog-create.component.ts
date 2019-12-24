import {Component, OnInit} from '@angular/core';
import {Tag} from '../tag';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {BlogService} from '../blog.service';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss']
})


export class BlogCreateComponent implements OnInit {
  ckEditorConfig = {
    filebrowserUploadUrl: 'http://localhost:4200/api/upload',
    filebrowserUploadMethod: 'form'
  };
  tagList: Tag[];
  BlogForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private blogService: BlogService) {
  }

  ngOnInit() {
    this.loadTagList();
    this.BlogForm = this.fb.group({
      tittle: [''],
      description: [''],
      tagList: [''],
      content: ['']
    });
  }

  loadTagList() {
    this.blogService.getTag().subscribe(data => {
      this.tagList = data;
    });
  }

  onSubmit() {
    this.blogService
  }
}
