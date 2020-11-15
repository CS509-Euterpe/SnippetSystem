import { Injectable } from "@angular/core";
import {webSocket, WebSocketSubject} from "rxjs/webSocket";
import { Subject, Observable, Observer } from "rxjs"
import { filter } from 'rxjs/operators';
import { INotification } from '../models/models';

@Injectable()
export class WebsocketService {
  constructor() {}

  private ws: WebSocketSubject<any>
  private url = "";

  public commentChanges(snippetId: number): Observable<INotification> {
    return this.getWebSocket().pipe(
      filter(msg => msg.eventType == "comment" && msg.snippetId == snippetId)
    )
  }

  public snippetChanges(snippetId: number): Observable<INotification> {
    return this.getWebSocket().pipe(
      filter(msg => msg.eventType == "snippet" && msg.snippetId == snippetId)
    )
  }

  private getWebSocket(): WebSocketSubject<any> {
    if (this.ws != null) return this.ws
    this.ws = webSocket(this.url)
  }
}