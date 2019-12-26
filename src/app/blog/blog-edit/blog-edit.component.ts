import {Component, OnInit} from '@angular/core';
import {Blog} from '../blog';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BlogService} from '../blog.service';
import {DataTranferService} from '../../data-tranfer.service';
import {Tag} from '../tag';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {
  ckEditorConfig = {
    filebrowserUploadUrl: 'http://localhost:4200/api/upload',
    filebrowserUploadMethod: 'form'
  };
  tagList = [];
  blogForm: FormGroup;
  blog: Blog;
  currentThumpnail: string;
  tagFormArray;

  constructor(private router: Router,
              private blogService: BlogService,
              private dataTransferService: DataTranferService,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    // this.blogForm = this.fb.group({
    //   id: [''],
    //   tittle: [''],
    //   description: [''],
    //   thumbnail: [''],
    //   content: ['']
    // });
    this.loadTagList();
    // this.blog = this.dataTransferService.getData();
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
      this.currentThumpnail = this.blog.thumbnail;
      this.blogForm = this.fb.group({
        id: [this.blog.id],
        tittle: [this.blog.tittle],
        description: [this.blog.description],
        thumbnail: [this.blog.thumbnail],
        tagList: this.fb.array([]),
        content: [this.blog.content]
      });
      this.tagFormArray = <FormArray> this.blogForm.controls.tagList;
      for (let item of this.blog.tagList) {
        this.tagFormArray.push(new FormControl(item.id));
      }
    });
  }

  onSubmit() {
    if (confirm('Are You Sure?')) {
      this.blogService.updateBlog(this.blogForm.value).subscribe(result => {
        const editedBlog = result;
        alert('Updated Blog: Id = ' + editedBlog.id + ' with Tittle =' + editedBlog.tittle);
        this.router.navigateByUrl('/blog');
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
        this.router.navigateByUrl('/blog');
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
}
