import { Component, Input, OnInit } from '@angular/core';
import { enumSelector, LanguageTypeEnum } from '../../models/enums';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent implements OnInit {

  languages = enumSelector(LanguageTypeEnum)
  @Input() selected: LanguageTypeEnum

  constructor() { 
  }

  ngOnInit(): void {
  }

}
