import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ISnippetDto, IComment, IModifySnippet } from '../models/models'; 

@Injectable({
  providedIn: 'root'
})

export class ApiRequestsService {

  private api = 'https://s3bv1jczza.execute-api.us-east-1.amazonaws.com/Alpha/api/v1';
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(
    private http: HttpClient
  ) 
  {

  }

  /* admin calls */
  getAllSnippets(): Observable<ISnippetDto[]> {
    const url = '${this.api}/snippets';
    return this.http.get<ISnippetDto[]>(url)
      .pipe(
        tap(_ => console.log("fetched snippets")),
        catchError(this.handleError<ISnippetDto[]>('getAllSnippets', []))
      );
  }

  //olderThan -> delete snippets older than this many days
  deleteStaleSnippets(olderThan: number): Observable<any> {
    const url = '${this.api}/snippets/delete-stale';
    return this.http.post(url, null)
    .pipe(
      tap(_ => console.log('delete stale snippets older than ${olderThan} days')),
      catchError(this.handleError<any>('deleteStaleSnippets'))
    );
  }

  /* user calls */
  getSnippet(snipId: string): Observable<ISnippetDto> {
    const url = '${this.api}/snippet/${snipId}';
    return this.http.get<ISnippetDto>(url)
    .pipe(
      tap(_ => console.log('get snippet: ${snipId}')),
      catchError(this.handleError<ISnippetDto>('getSnippet id=${snipId}'))
    );
  }

  getComments(snipId: string): Observable<IComment[]> {
    const url = '${this.api}/snippet/${snipId}/comments';
    return this.http.get<IComment[]>(url)
    .pipe(
      tap(_ => console.log('get Comments for snip: ${snipId}')),
      catchError(this.handleError<IComment[]>('getComments', []))
    );
  }

  postSnippet(newSnip: ISnippetDto): Observable<any> {
    const url = this.api + "/snippet/";
    console.log("sending to url: " +url );
    return this.http.post(url, newSnip)
    .pipe(
      tap(_ => console.log('posting snippet: \n' + newSnip)),
      catchError(this.handleError<any>('postSnippet'))
    );
  }

  deleteSnippet(snipId: string): Observable<any> {
    const url = '${this.api}/snippet/${snipId}/delete';
    return this.http.post(url, null)
    .pipe(
      tap(_ => console.log('deleting snippet: ${snipId}')),
      catchError(this.handleError<any>('deleteSnippet'))
    );
  }

  deleteComment(snipId: string, commentId: string): Observable<any> {
    const url = '${this.api}/snippet/${snipId}/comments/${commentId}/delete'
    return this.http.post(url, null)
    .pipe(
      tap(_ => console.log('deleting comment: ${commentId} from snippet: ${snippetId}')),
      catchError(this.handleError<any>('deleteComment'))
    );
  }

  
  
  //this one works right now...
  createSnippet(createSnip: IModifySnippet): Observable<ISnippetDto> {
    const url = this.api + '/snippet';
    console.log("sending to " + url);
    return this.http.put<ISnippetDto>(url, createSnip, this.httpOptions)
    .pipe(
      tap( _ => console.log('creating: ' + createSnip)),
      map(res => this.unpackResponse<ISnippetDto>(res)),
      catchError(this.handleError<any>('createSnippet'))
    );
  }



  updateComment(snipId: string, updateComment: IComment): Observable<any> {
    const url = '${this.api}/snippet/${snipId}/comments';
    return this.http.put(url, updateComment)
    .pipe(
      tap(_ => console.log('updating comment for snippet: ${snipId} with \n' + updateComment)),
      catchError(this.handleError<any>('updateComment'))
    );
  }

  private handleError<T>(Operation = 'operation', result?: T)
  {
    return(error: any): Observable<T> => {
      console.error(error);
      console.log('${operation} failed: ${error.message}');
      return of(result as T);
    }
  }

  //unpack response from server to Type T
  private unpackResponse<T>(response: any): T {
    if(response.httpCode == 200)
    {
      return response.snippet; 
    }
    else
    {
      console.log("Server gave error response: " + response.httpCode + " with message " + response.message);
      throw new Error("Server gave error response: " + response.httpCode + " with message " + response.message);
    } 
  }

}