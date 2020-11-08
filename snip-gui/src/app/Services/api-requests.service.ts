import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ISnippetDto, ISnippet, IComment, IModifySnippet } from '../models/models'; 

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

  //NOT FULLY IMPLEMENTED API CALLS

  // //olderThan -> delete snippets older than this many days
  // deleteStaleSnippets(olderThan: number): Observable<any> {
  //   const url = this.api + '/snippets/delete-stale';
  //   return this.http.post(url, null)
  //   .pipe(
  //     tap(_ => console.log('delete stale snippets older than ' + olderThan + ' days')),
  //     catchError(this.handleError<any>('deleteStaleSnippets'))
  //   );
  // }

  // /* user calls */





  // deleteSnippet(snipId: string): Observable<any> {
  //   const url = this.api + '/snippet/' + snipId + '/delete';
  //   return this.http.post(url, null)
  //   .pipe(
  //     tap(_ => console.log('deleting snippet: ' + snipId)),
  //     catchError(this.handleError<any>('deleteSnippet'))
  //   );
  // }

  // deleteComment(snipId: string, commentId: string): Observable<any> {
  //   const url = this.api + '/snippet/' + snipId + '/comments/' + commentId + '/delete'
  //   return this.http.post(url, null)
  //   .pipe(
  //     tap(_ => console.log('deleting comment: ' + commentId + ' from snippet: ' + snipId)),
  //     catchError(this.handleError<any>('deleteComment'))
  //   );
  // }

  // updateComment(snipId: string, updateComment: IComment): Observable<any> {
  //   const url = '${this.api}/snippet/${snipId}/comments';
  //   return this.http.put(url, updateComment)
  //   .pipe(
  //     tap(_ => console.log('updating comment for snippet: ${snipId} with \n' + updateComment)),
  //     catchError(this.handleError<any>('updateComment'))
  //   );
  // }

  // /* admin calls */
  getAllSnippets(): Observable<ISnippetDto[]> {
    const url = this.api + '/snippets';
    console.log("sending: " + url);
    return this.http.get<ISnippetDto[]>(url, this.httpOptions)
    .pipe(
      tap( _ => console.log("Getting all snippets")),
        map( res => this.deserializeSnippets(res)),
        catchError(this.handleError<ISnippetDto[]>('getSnippets', []))
    );
  }
  

  /* User calls */
  getComments(snipId: number): Observable<IComment[]> {
    const url = this.api + '/snippet/' + snipId + '/comments';
    return this.http.get<IComment[]>(url, this.httpOptions)
    .pipe(
      tap(_ => console.log('get Comments for snip: ' + snipId)),
      map( res => this.deserializeComments(res)),
      catchError(this.handleError<IComment[]>('getComments', []))
    );
  }
  
  updateSnippet(updateSnip: ISnippetDto): Observable<any> {
    const url = this.api + "/snippet/" + updateSnip.id;

    return this.http.post(url, updateSnip)
    .pipe(
      tap(_ => console.log('posting snippet: \n' + updateSnip)),
      catchError(this.handleError<any>('updateSnippet'))
    );
  }

  getSnippet(snipId: number): Observable<ISnippetDto> {
    const url = this.api + '/snippet/' + snipId;
    return this.http.get<ISnippetDto>(url, this.httpOptions)
    .pipe(
      map(res => this.deserializeSnippet(res))
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

  deserializeSnippets(res: any | unknown): ISnippetDto[] {

    console.log("DESERIALIZING SNIPPETS")
    console.log(res); 
    return res;
  }

  private deserializeComments(res: any): IComment[] {
    
    if(res.httpCode != 200)
    {
      throw new Error(res.msg)
    }

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

    return comments;
    
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