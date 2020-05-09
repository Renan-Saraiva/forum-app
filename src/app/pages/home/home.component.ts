import { Component, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public running: boolean = true;
  public comments: Comment[] = [];
  public error: boolean = false;

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.commentsService.ListAll().subscribe(
      (comments) => {
        this.comments = comments;
        this.RequestEnd();
      },
      err => { 
        this.error = true;
        this.RequestEnd();
      }
    )
  }
  
  addComment(comment: Comment) {
    this.comments.push(comment);
  }

  private RequestEnd() {
    this.running = false;
  }
}
