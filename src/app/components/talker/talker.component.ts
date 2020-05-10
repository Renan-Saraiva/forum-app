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
  error: boolean = false;

  @Output() onComment: EventEmitter<Comment> = new EventEmitter();
  @Input("reply-to") replyCommentId: string;

  constructor(private commentsService: CommentsService) { }

  ngOnInit() { }

  CreateComment(form: NgForm) {
    this.running = true;
    this.error = false;
    this.PostComment(form.value).subscribe(
        comment => {
          this.onComment.emit(comment)
          this.RequestEnd(form);
        },
        err => {
          this.error = true;
          this.RequestEnd(form);
        }
      )
  }

  private PostComment(comment: Comment): Observable<Comment> {
    if (this.replyCommentId)
      return this.commentsService.AddReply(this.replyCommentId, comment);

    return this.commentsService.Add(comment);
  }

  private RequestEnd(form: NgForm) {
    form.reset();
    this.running = false;
  }
}
