import { Component, OnInit } from '@angular/core';
import {BlogService} from '../blog.service';
import {Tag} from '../tag';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-tags-specific-blog-list',
  templateUrl: './tags-specific-blog-list.component.html',
  styleUrls: ['./tags-specific-blog-list.component.scss']
})
export class TagsSpecificBlogListComponent implements OnInit {
  tagList: Tag[];
  TagsForm: FormGroup;

  constructor(
    private blogService: BlogService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.loadTagList();
    this.TagsForm = this.fb.group({
      tagList: this.fb.array([]),
    }, {validators: checkTags});
  }

  loadTagList() {
    this.blogService.getTag().subscribe(data => {
      this.tagList = data;
    });
  }

  onChangeBox(id: number, checked: boolean) {
    const tagFormArray = this.TagsForm.controls.tagList as FormArray;

    if (checked) {
      tagFormArray.push(new FormControl(id));
    } else {
      const index = tagFormArray.controls.findIndex(x => x.value === id);
      tagFormArray.removeAt(index);
    }
  }
}
function checkTags(c: AbstractControl) {
  const v = c.value;
  return (v.tagList.length !== 0) ? null : {
    emptyTagList: true
  };
}
