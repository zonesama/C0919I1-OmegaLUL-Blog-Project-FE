import {Component, OnInit} from '@angular/core';
import {Tag} from '../tag';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BlogService} from '../blog.service';
import {Blog} from '../blog';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Location} from '@angular/common';
import {BlogForm} from '../blog-form';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss']
})


export class BlogCreateComponent implements OnInit {
  ckEditorConfig = {
    extraPlugins: 'uploadimage',
    minWidth: 500,
    height: 800,
    filebrowserUploadUrl: 'http://localhost:4200/api/upload',
    filebrowserUploadMethod: 'xhr',
    fileTools_requestHeaders: {
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: 'Bearer ' + this.token.getToken()
    },
    toolbarGroups: [
      {name: 'insert', groups: ['insert']},
      '/',
      // {name: 'document', groups: ['mode', 'document', 'doctools']},
      {name: 'clipboard', groups: ['clipboard', 'undo']},
      {name: 'editing', groups: ['find', 'selection']},
      '/',
      {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
      {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']},
      {name: 'links', groups: ['links']},
      '/',
      {name: 'styles', groups: ['styles']},
      {name: 'colors', groups: ['colors']},
    ]
  };
  tagList: Tag[];
  BlogForm: FormGroup;
  blog: Blog;
  currentThumpnail: string;
  checked = true;

  constructor(private fb: FormBuilder,
              private router: Router,
              private blogService: BlogService,
              private token: TokenStorageService,
              private location: Location) {
  }

  ngOnInit() {
    this.loadTagList();
    this.BlogForm = this.fb.group({
      tittle: ['', Validators.required],
      description: ['', Validators.required],
      thumbnail: ['', Validators.required],
      tagList: this.fb.array([]),
      content: [Validators.required],
      username: [this.token.getUsername()],
      isPrivate: []
    })
    ;
  }

  loadTagList() {
    this.blogService.getTag().subscribe(data => {
      this.tagList = data;
    });
  }

  onSubmit() {
    console.log(this.BlogForm.value);
    if (confirm('Are You Sure?')) {
      this.blogService.createNewBlog(this.BlogForm.value).subscribe(data => {
        console.log(data);
        this.blog = data;
        alert('Create Blog: ' + this.blog.tittle);
        this.goBack();
      });
    }
  }

  onChangeBox(id: number, checked: boolean) {
    const tagFormArray = <FormArray> this.BlogForm.controls.tagList;

    if (checked) {
      tagFormArray.push(new FormControl(id));
    } else {
      let index = tagFormArray.controls.findIndex(x => x.value === id);
      tagFormArray.removeAt(index);
    }
  }

  onChangeThumpnailUrl(event) {
    this.currentThumpnail = event.target.value;
  }

  goBack() {
    this.location.back();
  }

  // changePrivateState() {
  //   const isPrivate = this.BlogForm.get('isPrivate').value;
  //   if (isPrivate) {
  //     this.BlogForm.controls['isPrivate'].setValue(false);
  //   } else {
  //     this.BlogForm.controls['isPrivate'].setValue(true);
  //   }
  // }
}
