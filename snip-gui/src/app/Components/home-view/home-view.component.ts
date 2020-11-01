import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { ApiRequestsService } from 'src/app/Services/api-requests.service';
import { IModifySnippet, ISnippet } from 'src/app/models/models';
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

  constructor(private api: ApiRequestsService) { 
    this.navSnippetId = "";
    this.blankSnippet = new BlankSnippet();
  }

  ngOnInit(): void {
  }

  createSnippet() {
    this.blankSnippet.timestamp = '2020-10-30'
    //new Date().toISOString();

    console.log("sending...");

    var newSnip = <IModifySnippet> {
      info : this.blankSnippet.info,
      language : this.blankSnippet.language,
      content : this.blankSnippet.content,
      name : this.blankSnippet.name,
      password : this.blankSnippet.password,
      timestamp : this.blankSnippet.timestamp
    }
    console.log(newSnip);
    this.api.createSnippet(newSnip).subscribe(
      x => console.log(x),
      err => console.error(err),
      () => console.log('Observer got a complete notification')
    );

  }

  redirectToSnippet(snippetId: number) {
    //todo: forward to snippet/$snippetId
  }
}