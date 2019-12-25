import {Component, OnInit} from '@angular/core';
import {Blog} from '../blog';
import {Router} from '@angular/router';
import {DataTranferService} from '../../data-tranfer.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  blog: Blog;
  tags = 'Tags: ';

  constructor(private router: Router,
              private dataTransferService: DataTranferService) {
  }

  ngOnInit() {
    this.blog = this.dataTransferService.getData();
    for (let item of this.blog.tagList) {
      this.tags += item.name + '/';
    }
    this.tags = this.tags.substring(0, this.tags.length - 1);
  }
}
