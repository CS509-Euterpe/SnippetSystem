import { Injectable } from "@angular/core";
import {webSocket, WebSocketSubject} from "rxjs/webSocket";
import { Subject, Observable, Observer } from "rxjs"
import { filter, map } from 'rxjs/operators';
import { INotification } from '../models/models';

@Injectable()
export class WebsocketService {
  constructor() {}

  private ws: WebSocketSubject<any>
  private url = "wss://6u65iac1vf.execute-api.us-east-1.amazonaws.com/Alpha";
  private connectionId: string;

  public commentChanges(snippetId: number): Observable<INotification> {
    return this.getWebSocket(snippetId).pipe(
      filter(msg => msg.eventType == "comment" && msg.snippetId == snippetId),
      map( msg => msg as INotification)
    )
  }

  public snippetChanges(snippetId: number): Observable<INotification> {
    return this.getWebSocket(snippetId).pipe(
      filter(msg => msg.eventType == "snippet" && msg.snippetId == snippetId),
      map( msg => msg as INotification)
    )
  }

  private getWebSocket(snippetId: number): WebSocketSubject<any> {
    if (this.ws != null) return this.ws
    this.ws = webSocket(this.url)
    
    this.ws.pipe(
      filter( msg => msg.connectionId != null)
    ).subscribe (
      msg =>  this.connectionId = msg.connectionId
    );
      
    this.ws.next(
      {
        eventType: "open",
        snippetId: snippetId
      }
    )

    return this.ws;   
  }
}
