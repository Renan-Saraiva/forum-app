import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/models/comment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.css']
})
export class CommentViewComponent implements OnInit {

  running: boolean = true;
  error: boolean = false;
  comment: Comment;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private commentsService: CommentsService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.getComment(params["id"]);
      }
    )
  }

  getComment(id: string) {
    this.running = true;
    this.error = false;
    this.commentsService.Get(id).subscribe(
      comment => {
        this.comment = comment  
        this.RequestEnd();
      },
      err => {
        if (err.status == 404){
          this.router.navigate(['/not-found']);
        }
        this.error = true;
        this.RequestEnd();
      }
    )
  }

  private RequestEnd() {
    this.running = false;
  }

}
