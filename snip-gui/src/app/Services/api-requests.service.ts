import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiRequestsService {

  private createSnippetUrl = '';
  private getSnippetUrl = '';
  private updateSnippetUrl = '';
  private deleteSnippetUrl = '';
  private addCommentUrl = '';
  
  constructor(
    private http: HttpClient
  ) 
  {

  }
}
