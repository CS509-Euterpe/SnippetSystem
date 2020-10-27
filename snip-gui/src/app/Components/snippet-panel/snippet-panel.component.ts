import { Component, Input, OnInit } from '@angular/core';
import { ISnippet } from 'src/app/models/models';

@Component({
  selector: 'app-snippet-panel',
  templateUrl: './snippet-panel.component.html',
  styleUrls: ['./snippet-panel.component.css']
})
export class SnippetPanelComponent implements OnInit {

  panelOpenState = true;
  @Input() snippet: ISnippet

  constructor() {
  }

  ngOnInit(): void {
  }

}
