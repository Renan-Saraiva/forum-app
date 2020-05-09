import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient, private config: ConfigService) 
  {
      this.baseUrl = `${config.getConfig().forumApi.url}/comments`
  }

  public List() {
    return this.httpClient.get<Comment[]>(this.baseUrl);
  }

  

}
