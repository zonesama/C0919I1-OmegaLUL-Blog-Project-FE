import { Component, OnInit } from '@angular/core';
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
  constructor(private router: Router,
              private dataTransferService: DataTranferService) { }

  ngOnInit() {
    this.blog = this.dataTransferService.getData();
  }
}
