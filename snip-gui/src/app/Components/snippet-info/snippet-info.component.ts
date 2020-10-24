import { Component, OnInit, Input } from '@angular/core';
import { ISnippet } from '../../models/models';

@Component({
  selector: 'app-snippet-info',
  templateUrl: './snippet-info.component.html',
  styleUrls: ['./snippet-info.component.css']
})
export class SnippetInfoComponent implements OnInit {

  @Input() snippet: ISnippet
  
  constructor() {  
  }

  ngOnInit(): void {
  }

}
