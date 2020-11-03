import { Component, Input, OnInit } from '@angular/core';
import { LanguageMimeStrings, LanguageTypeEnum } from 'src/app/models/enums';
import { ISnippet } from 'src/app/models/models';

@Component({
  selector: 'app-snippet-panel',
  templateUrl: './snippet-panel.component.html',
  styleUrls: ['./snippet-panel.component.css']
})
export class SnippetPanelComponent implements OnInit {

  panelOpenState = true;
  @Input() snippet: ISnippet;
  currentLanguage = LanguageTypeEnum.Java;

  codeStyleOptions: any = {
    lineNumbers: true,
    theme: 'eclipse',
    mode:''
  }

  constructor() {
    this.setCodeStyle(this.currentLanguage)
  }

  ngOnInit(): void {
  }

  onLanguageChanged(language: LanguageTypeEnum): void {
    this.currentLanguage = language;
    this.snippet.language = this.currentLanguage;
    this.setCodeStyle(language)
  }

  setCodeStyle(language: LanguageTypeEnum): void {
    var mime = LanguageMimeStrings.get(language as LanguageTypeEnum)
    if (mime === undefined){
      mime = LanguageMimeStrings.get(LanguageTypeEnum.None)
    }
    this.codeStyleOptions.mode = LanguageMimeStrings.get(language);
  }


}
