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
  blankSnippet: ISnippet;
  navSnippetId: string;

  gotoSnippetUrl: string = "[url]/snippet?id="; // redirect user after creating snippet OR when pressing "GO!"
  postSnippetUrl: string = "[url]/TBD/...";


  constructor() { 
    this.navSnippetId = "";
    this.blankSnippet = new BlankSnippet();
  }

  ngOnInit(): void {
  }

  createSnippet() {
    this.blankSnippet.timestamp = new Date().toISOString();
    this.blankSnippet.id = uuid();

    console.log(this.blankSnippet);
    //Sent to DB as POST request
    //Redirect user to '[url]/sinippet?id=' + newId
  }
}