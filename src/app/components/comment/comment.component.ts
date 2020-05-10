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
  public runningLike = false;

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

  private RequestEnd() {
    this.running = false;
  }

  public AddReply(comment: Comment) {
    this.comment.replies.push(comment);
  }

  public Like() {
    this.runningLike = true;
    this.commentsService.Like(this.comment.id).subscribe(
      () => { 
        this.comment.likes++;
        this.RequestLikeEnd();
      },        
      (err) => {
        this.RequestLikeEnd();
      }
    );
  }

  private RequestLikeEnd() {
    this.runningLike = false;
  }
}
