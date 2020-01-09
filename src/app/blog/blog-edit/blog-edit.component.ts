import {Component, OnInit} from '@angular/core';
import {Blog} from '../blog';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BlogService} from '../blog.service';
import {DataTranferService} from '../../data-tranfer.service';
import {Tag} from '../tag';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Location} from '@angular/common';
import {InitBlogListDataService} from '../../init-blog-list-data.service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {
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
  // Editor = ClassicEditor;
  // editorConfig = {
  //   UploadUrl: 'http://localhost:4200/api/upload',
  //   UploadMethod: 'form',
  // };
  tagList = [];
  blogForm: FormGroup;
  blog: Blog;
  currentThumpnail: string;
  tagFormArray;

  constructor(private router: Router,
              private blogService: BlogService,
              private dataTransferService: DataTranferService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private token: TokenStorageService,
              private location: Location,
              private initBlogListDataService: InitBlogListDataService) {
  }

  ngOnInit() {
    this.loadTagList();
    this.loadBlog();
  }

  loadTagList() {
    this.blogService.getTag().subscribe(data => {
      this.tagList = data;
    });
  }

  loadBlog() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.blogService.getBlogById(id).subscribe(data => {
      this.blog = data;
      console.log(this.blog.isPrivate);
      this.currentThumpnail = this.blog.thumbnail;
      this.blogForm = this.fb.group({
        id: [this.blog.id],
        tittle: [this.blog.tittle, Validators.required],
        description: [this.blog.description, Validators.required],
        thumbnail: [this.blog.thumbnail, Validators.required],
        tagList: this.fb.array([]),
        content: [this.blog.content, Validators.required],
        username: [this.token.getUsername()],
        isPrivate: [this.blog.isPrivate]
      }, {validators: checkTags});
      this.tagFormArray = <FormArray> this.blogForm.controls.tagList;
      for (let item of this.blog.tagList) {
        this.tagFormArray.push(new FormControl(item.id));
      }
    });
    console.log(this.blogForm.value);
  }

  onSubmit() {
    if (confirm('Are You Sure?')) {
      this.blogService.updateBlog(this.blogForm.value).subscribe(result => {
        const editedBlog = result;
        alert('Updated Blog: Id = ' + editedBlog.id + ' with Tittle =' + editedBlog.tittle);
        this.blogService.getBlogList().subscribe(data => {
          this.initBlogListDataService.setFullBlogList(data);
        });
        this.blogService.getUserSpecificBlog().subscribe(data => {
          this.initBlogListDataService.setUserFullBlogList(data);
        });
        this.goBack();
      });
    }
  }


  onChangeBox(id: number, checked: boolean) {
    if (checked) {
      this.tagFormArray.push(new FormControl(id));
    } else {
      let index = this.tagFormArray.controls.findIndex(x => x.value === id);
      this.tagFormArray.removeAt(index);
    }
  }

  onChangeThumpnailUrl(event) {
    this.currentThumpnail = event.target.value;
  }


  deleteBlog() {
    if (confirm('Are You Sure?')) {
      this.blogService.deleteBlog(this.blog.id).subscribe(result => {
        let deletedBlog: Blog;
        deletedBlog = result;
        alert('Deleted Blog: ' + deletedBlog.tittle);
        this.goBack();
      });
    }
  }

  checkedTag(id: number, tagList: Tag[]) {
    for (let item of tagList) {
      if (id === item.id) {
        return true;
      }
    }
    return false;
  }

  checkPrivateStatus() {
    if (this.blog.isPrivate === true) {
      return true;
    }
    return false;
  }

  goBack() {
    this.location.back();
  }
}

function checkTags(c: AbstractControl) {
  const v = c.value;
  return (v.tagList.length !== 0) ? null : {
    emptyTagList: true
  };
}
