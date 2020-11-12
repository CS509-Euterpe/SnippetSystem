import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageTypeEnum } from 'src/app/models/enums';
import { ISnippet } from '../../models/models';
import { BaseSnippetComponent } from '../base-snippet/base-snippet-component';

@Component({
  selector: 'app-snippet-info',
  templateUrl: './snippet-info.component.html',
  styleUrls: ['./snippet-info.component.css']
})
export class SnippetInfoComponent extends BaseSnippetComponent{

  @Input() snippet: ISnippet
  @Output() languageChanged = new EventEmitter<LanguageTypeEnum>()
  
  constructor(
    route: ActivatedRoute
  ) {  
    super(route)
  }

  ngOnInit(): void {
    super.ngOnInit()
  }

  onLanguageChanged(language: LanguageTypeEnum): void {
    this.languageChanged.emit(language);
  }


}
