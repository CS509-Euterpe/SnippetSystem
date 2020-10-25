import { Component, OnInit, Input } from '@angular/core';
import { ISnippet } from 'src/app/models/models';
import { SnippetStub } from 'src/app/models/stubs';

@Component({
  selector: 'app-snippet-view',
  templateUrl: './snippet-view.component.html',
  styleUrls: ['./snippet-view.component.css']
})
export class SnippetViewComponent implements OnInit {

  snippet: ISnippet

  constructor() {
    this.snippet = new SnippetStub()
    this.snippet.isCreating = false;
   }

  ngOnInit(): void {
  }

}
