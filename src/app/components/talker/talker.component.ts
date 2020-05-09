import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Comment } from '../../models/comment';
import { CommentsService } from 'src/app/services/comments.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-talker',
  templateUrl: './talker.component.html',
  styleUrls: ['./talker.component.css']
})
export class TalkerComponent implements OnInit {

  running: boolean = false;

  @Output() onComment: EventEmitter<Comment> = new EventEmitter();
  @Input("reply-to") replyCommentId: string;

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {

  }

  CreateComment(f: NgForm) {
    this.running = true;
    this.PostComment(f.value).subscribe(
        comment => {
          this.onComment.emit(comment)
          this.RequestEnd();
        },
        err => {
          console.log(err)
          this.RequestEnd();
        }
      )
  }

  private PostComment(comment: Comment): Observable<Comment> {
    if (this.replyCommentId)
      return this.commentsService.AddReply(this.replyCommentId, comment);

    return this.commentsService.Add(comment);
  }

  private RequestEnd() {
    this.running = false;
  }
}
