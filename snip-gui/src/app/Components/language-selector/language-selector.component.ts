import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { enumSelector, LanguageTypeEnum } from '../../models/enums';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent implements OnInit {

  languages = enumSelector(LanguageTypeEnum)
  @Input() selected: LanguageTypeEnum
  @Output() languageChanged = new EventEmitter<LanguageTypeEnum>()

  constructor() { 
  }

  ngOnInit(): void {
  }

  onSelectionChanged(change: MatSelectChange)
  {
    this.selected = change.value as LanguageTypeEnum
    this.languageChanged.emit(this.selected)
  }
}
