import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {


  @Input("load-replies") loadReplies: boolean = false;
  @Input() comment: Comment;

  public running = false;
  public error = false;

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {

    if (this.loadReplies) {
      this.LoadReplies();
    }
  }

  public LoadReplies() {
    this.running = true;
    this.comment.replies = [];
    this.commentsService.GetReplies(this.comment.id).subscribe(
      (replies) => {        
        this.RequestEnd();
        this.comment.replies = this.comment.replies.concat(replies);        
      },
      err => {
        this.error = true;
        this.RequestEnd();
      }
    )
  }

  public addReply(comment: Comment) {
    this.comment.replies.push(comment);
  }

  private RequestEnd() {
    this.running = false;
  }

}
