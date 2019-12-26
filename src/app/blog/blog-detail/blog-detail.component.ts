import {Component, OnInit} from '@angular/core';
import {Blog} from '../blog';
import {ActivatedRoute, Router} from '@angular/router';
import {DataTranferService} from '../../data-tranfer.service';
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
              private blogService: BlogService,
              private dataTransferService: DataTranferService) {
  }

  ngOnInit() {
    // this.blog = this.dataTransferService.getData();
    // tslint:disable-next-line:radix
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.blogService.getBlogById(id).subscribe(data => {
      this.blog = data;
    });
    for (let item of this.blog.tagList) {
      this.tags += item.name + '/';
    }
    this.tags = this.tags.substring(0, this.tags.length - 1);
  }

  // exportAsPDF() {
  //   let data = <HTMLScriptElement> document.getElementById('blog-content');
  //   html2canvas(data).then(canvas => {
  //     const contentDataURL = canvas.toDataURL('image/png');
  //     let pdf = new jspdf('p', 'pt', 'a4'); //Generates PDF in landscape mode
  //     // let pdf = new jspdf('p', 'pt', 'a4'); //Generates PDF in portrait mode
  //     pdf.addImage(contentDataURL, 'PNG', 40, 20, 515, 600);
  //     pdf.save('Filename.pdf');
  //   });
  // }
}
