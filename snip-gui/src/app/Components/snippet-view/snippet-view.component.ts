import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISnippet } from 'src/app/models/models';
import { SnippetStub } from 'src/app/models/stubs';

@Component({
  selector: 'app-snippet-view',
  templateUrl: './snippet-view.component.html',
  styleUrls: ['./snippet-view.component.css']
})
export class SnippetViewComponent implements OnInit {

  snippet: ISnippet
  id: string

  constructor(
    private route: ActivatedRoute
  ) {
    this.snippet = new SnippetStub()
    this.snippet.isCreating = false;
   }

  ngOnInit(): void {    
    this.id = this.getRouteId();
    //TODO - fetch snippet

    this.snippet.id = this.id;
  }

  getRouteId(): string {
    return this.route.snapshot.paramMap.get('id');
  }

}
