import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ISnippetDto, IComment, ICommentDto, IAddComment, IModifySnippet } from '../models/models'; 
import { UserAccessEnum } from '../models/enums';

@Injectable({
  providedIn: 'root'
})

export class ApiRequestsService {

  private api = 'https://s3bv1jczza.execute-api.us-east-1.amazonaws.com/Alpha/api/v1';
  
  private httpOptions = {
    headers: new HttpHeaders({
                               'Content-Type': 'application/json',
                               'Accept' : 'application/json'
                              })
  };
  
  constructor(
    private http: HttpClient
  ) 
  {

  }

  // //olderThan -> delete snippets older than this many days
  deleteStaleSnippets(olderThan: number): Observable<any> {
    const url = this.api + '/snippets/delete-stale/' + olderThan;
    console.log("sending" + url)
    return this.http.post(url, null)
    .pipe(
      tap(_ => console.log('delete stale snippets older than ' + olderThan + ' days')),
      catchError(this.handleError<any>('deleteStaleSnippets'))
    );
  }

  createComment(createComment: IAddComment): Observable<any> {
    const url = `${this.api}/snippet/${createComment.snippetId}/comments`;
    console.log("sending to " + url + " with comment: ");
    console.log(createComment);
    return this.http.put<any>(url, createComment, this.httpOptions)
    .pipe(
      tap(_ => console.log('creating comment...' + createComment.snippetId + ' with \n' + createComment)),
      map(res => console.log(res.httpCode)),
      catchError(this.handleError<any>('createComment'))
    );
  }

  // /* admin calls */
  getAllSnippets(): Observable<ISnippetDto[]> {
    const url = this.api + '/snippets';
    console.log("sending: " + url);
    return this.http.get<any>(url, this.httpOptions)
    .pipe(
      tap( _ => console.log("Getting all snippets")),
      map( res => res as ISnippetDto[]),
      catchError(this.handleError<ISnippetDto[]>('getSnippets', []))
    );
  }

  /* User calls */
  getComments(snipId: number): Observable<ICommentDto[]> {
    const url = this.api + '/snippet/' + snipId + '/comments';
    return this.http.get<ICommentDto[]>(url, this.httpOptions)
    .pipe(
      tap(_ => console.log('get Comments for snip: ' + snipId)),
      map( res => res as ICommentDto[]),
      catchError(this.handleError<ICommentDto[]>('getComments', []))
    );
  }
  
  updateSnippet(updateSnip: ISnippetDto): Observable<ISnippetDto> {
    const url = this.api + "/snippet/" + updateSnip.id;
    return this.http.post(url, updateSnip)
    .pipe(
      map(res => this.deserializeSnippet(res))
    );
  }

  getSnippet(snipId: number): Observable<ISnippetDto> {
    const url = this.api + '/snippet/' + snipId;
    return this.http.get<ISnippetDto>(url, this.httpOptions)
    .pipe(
      map(res => this.deserializeSnippet(res))
    );
  } 

  deleteComment(snipId: number, commentId: number): Observable<any> {
    let url = this.api + '/snippet/' + snipId + '/comments/' + commentId + '/delete'
    return this.http.post(url, null)
    .pipe(
      tap(_ => console.log('deleting comment: ${commentId} from snippet: ${snippetId}')),
    );
  }

  
  deleteSnippet(snipId: number, user: UserAccessEnum): Observable<any> {
    let url = this.api + '/snippet/' + snipId + '/delete?user=' + user.toString();
    return this.http.post(url, null)
    .pipe(
      tap(_ => console.log('deleting snippet: ' + snipId))
    );
  }
  
  createSnippet(createSnip: IModifySnippet): Observable<ISnippetDto> {
    const url = this.api + '/snippet';
    return this.http.put<IModifySnippet>(url, createSnip, this.httpOptions)
    .pipe(
      map(res => this.deserializeSnippet(res))
    );
  }

  private deserializeSnippet(res: any | unknown): ISnippetDto {
    if(res.httpCode != 200)
    {
      throw new Error(res.msg)
    }
    let unpacked = <ISnippetDto> {
      id: res.content.id,
      comments: res.content.comments,
      info: res.content.info,
      language: res.content.language,
      timestamp: res.content.timestamp,
      content: res.content.content,
      password: res.content.password,
      name: res.content.name,
    }
    return unpacked;
  }

   /**
   * @param Operation -> name of operation we are running (i.e. updateComment)
   * @param result  -> type of result we are expecting
   */
  private handleError<T>(Operation = 'operation', result?: T)
  {
    return(error: any): Observable<T> => {
      console.error(error);
      console.log( Operation + ' failed');
      return of(result as T);
    }
  }
}