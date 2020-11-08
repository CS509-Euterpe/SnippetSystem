import { Component, Input, OnInit } from '@angular/core';
import { ISnippet } from 'src/app/models/models';

@Component({
  selector: 'app-snippet-preview',
  templateUrl: './snippet-preview.component.html',
  styleUrls: ['./snippet-preview.component.css']
})
export class SnippetPreviewComponent implements OnInit {

  @Input() snippet: ISnippet;
  
  constructor() { }

  ngOnInit(): void {
  }

}
