import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { LanguageTypeEnum, UserAccessEnum } from 'src/app/models/enums';
import { ISnippet } from 'src/app/models/models';
import { BlankSnippet } from 'src/app/models/stubs';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})

export class HomeViewComponent implements OnInit {

  //create this obj so we can use it for drop-down list values
  LanguageTypeEnum = LanguageTypeEnum;
  newSnipForm; //snippet form...
  blankSnippet: ISnippet;

  gotoSnippetUrl: string = "[url]/snippet?id="; // redirect user after creating snippet OR when pressing "GO!"
  postSnippetUrl: string = "[url]/TBD/...";

  constructor(private formBuilder: FormBuilder) { 
    this.newSnipForm = formBuilder.group({
      info: '',
      language: LanguageTypeEnum.None,
      content: '',
      password: '',
      username: '' 
    });
    this.blankSnippet = new BlankSnippet();
  }

  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      ctrl1: this.formBuilder.control('')
    });
  }

  createSnippet(snip: SnipForm) {
    var newTime = new Date();
    var newId = uuid();

    //create the snippet
    var newSnip = <ISnippet> {
      id: newId,
      path: "/snippets/" + newId,
      name: snip.username,
      comments: [], 
      info: snip.info,
      language: snip.language,
      timestamp: newTime.toISOString(),
      content: snip.content,
      password: snip.password
    }

    console.log(newSnip);
    //Sent to DB as POST request
    //Redirect user to '[url]/sinippet?id=' + newId
  }
}


/* holder obj for creating the snippet */
export interface SnipForm {
  info: string;
  language: LanguageTypeEnum;
  content: string;
  password: string;
  username: string;
}
