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
    const url = this.api + '/snippets';
    return this.http.get<ISnippetDto[]>(url)
      .pipe(
        tap(_ => console.log("fetched snippets")),
        catchError(this.handleError<ISnippetDto[]>('getAllSnippets', []))
      );
  }

  //olderThan -> delete snippets older than this many days
  deleteStaleSnippets(olderThan: number): Observable<any> {
    const url = this.api + '/snippets/delete-stale';
    return this.http.post(url, null)
    .pipe(
      tap(_ => console.log('delete stale snippets older than ' + olderThan + ' days')),
      catchError(this.handleError<any>('deleteStaleSnippets'))
    );
  }

  /* user calls */



  updateSnippet(newSnip: ISnippetDto): Observable<any> {
    const url = this.api + "/snippet/";
    console.log("sending to url: " +url );
    return this.http.post(url, newSnip)
    .pipe(
      tap(_ => console.log('posting snippet: \n' + newSnip)),
      catchError(this.handleError<any>('updateSnippet'))
    );
  }

  deleteSnippet(snipId: string): Observable<any> {
    const url = this.api + '/snippet/' + snipId + '/delete';
    return this.http.post(url, null)
    .pipe(
      tap(_ => console.log('deleting snippet: ' + snipId)),
      catchError(this.handleError<any>('deleteSnippet'))
    );
  }

  deleteComment(snipId: string, commentId: string): Observable<any> {
    const url = this.api + '/snippet/' + snipId + '/comments/' + commentId + '/delete'
    return this.http.post(url, null)
    .pipe(
      tap(_ => console.log('deleting comment: ' + commentId + ' from snippet: ' + snipId)),
      catchError(this.handleError<any>('deleteComment'))
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

  getComments(snipId: number): Observable<IComment[]> {
    const url = this.api + '/snippet/' + snipId + '/comments';
    return this.http.get<IComment[]>(url, this.httpOptions)
    .pipe(
      tap(_ => console.log('get Comments for snip: ' + snipId)),
      map( res => this.deserializeComments(res)),
      catchError(this.handleError<IComment[]>('getComments', []))
    );
  }

  getSnippet(snipId: number): Observable<ISnippetDto> {
    const url = this.api + '/snippet/' + snipId;
    console.log('sending ' + url);
    return this.http.get<ISnippetDto>(url, this.httpOptions)
    .pipe(
      tap(_ => console.log('get snippet:' + snipId),
      map(res => this.deserializeSnippet(res))
      ),
      catchError(this.handleError<ISnippetDto>('getSnippet id=' + snipId))
    );
  } 

  createSnippet(createSnip: IModifySnippet): Observable<ISnippetDto> {
    const url = this.api + '/snippet';
    //console.log("sending to " + url);
    return this.http.put<IModifySnippet>(url, createSnip, this.httpOptions)
    .pipe(
      tap( _ => { console.log('creating: '); console.log(createSnip) }),
      map(res => this.deserializeSnippet(res)),
      catchError(this.handleError<any>('createSnippet'))
    );
  }

  private deserializeSnippet(res: any): ISnippetDto {
    //handle http response
    if(res.httpCode != 200)
    {
      console.log("unexpected response:")
      console.log(res)
    }
    else
    {
      console.log('unpacking snippet')

      let unpacked = <ISnippetDto> {
        id: res.content.id,
        comments: null,
        info: res.content.info,
        language: res.content.language,
        timestamp: res.content.timestamp,
        content: res.content.content,
        password: res.content.password,
        name: res.content.name
      }
      return unpacked;
    }
  }

  private deserializeComments(res: any): IComment[] {
    
    if(res.httpCode != 200)
    {
      console.log('unexpected response')
      console.log(res)
      throw new Error('unexpected response: ' + res.message)
    }
    else
    {
      console.log('unpacking comments')
      console.log(res)
      console.log(res.content)

      var comments = [];

      res.content.array.forEach(element => {
        comments.push(
          <IComment> {
            id: element.id,
            timestamp: element.timestamp,
            text: element.text,
            name: element.name,
            region: element.region //this probably won't jive with the response body
          }
        )
        
      });

      console.log(comments); 
      return comments;
    }
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