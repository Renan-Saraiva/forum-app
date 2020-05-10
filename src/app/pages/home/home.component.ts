import { Component, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/models/comment';
import { ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public running: boolean = true;
  public comments: Comment[] = [];
  public error: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      query => {
        if(query.text) {
          this.GetPosts(query.text, query.orderBy);
          return;
        }
        if(query.orderBy) {
          this.GetPosts(undefined, query.orderBy);
          return;
        }
        this.GetPosts();
      }
    )    
  }

  public GetPosts(textFilter?:string, orderBy?: string) {
    this.running = true;
    this.comments = [];
    this.MakeRequestByFilter(textFilter, orderBy).subscribe(
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

  public MakeRequestByFilter(textFilter?:string, orderBy?: string) {
    if (textFilter)
      return this.commentsService.GetPosts("text", textFilter, orderBy);
    
    if (orderBy)
      return this.commentsService.GetPosts(undefined, undefined, orderBy);

    return this.commentsService.GetPosts();
  }
  
  public addComment(comment: Comment) {
    this.comments.push(comment);
  }

  private RequestEnd() {
    this.running = false;
  }
}
