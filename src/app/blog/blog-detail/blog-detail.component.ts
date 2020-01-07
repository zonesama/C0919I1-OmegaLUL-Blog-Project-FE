import {Component, OnInit} from '@angular/core';
import {Blog} from '../blog';
import {ActivatedRoute, Router} from '@angular/router';
import {faFacebookSquare} from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import {faTwitterSquare} from '@fortawesome/free-brands-svg-icons/faTwitterSquare';
import {BlogService} from '../blog.service';


@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  fbIcon = faFacebookSquare;
  tweetIcon = faTwitterSquare;
  blog: Blog;
  tags = 'Tags: ';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private blogService: BlogService) {
  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.blogService.getBlogById(id).subscribe(data => {
      this.blog = data;
      for (let item of this.blog.tagList) {
        this.tags += item.name + ', ';
      }
      this.tags = this.tags.substring(0, this.tags.length - 2);
    });
  }
}
