import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LanguageTypeEnum } from 'src/app/models/enums';
import { ISnippet } from '../../models/models';

@Component({
  selector: 'app-snippet-info',
  templateUrl: './snippet-info.component.html',
  styleUrls: ['./snippet-info.component.css']
})
export class SnippetInfoComponent implements OnInit {

  @Input() snippet: ISnippet
  @Output() languageChanged = new EventEmitter<LanguageTypeEnum>()
  
  constructor() {  
  }

  ngOnInit(): void {
  }

  onLanguageChanged(language: LanguageTypeEnum): void {
    this.languageChanged.emit(language);
  }


}
