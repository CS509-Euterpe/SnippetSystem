import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestsService } from 'src/app/Services/api-requests.service';
import { IModifySnippet, ISnippet } from 'src/app/models/models';
import { BlankSnippet } from 'src/app/models/stubs';
import { observable, Observable } from 'rxjs';



@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})

export class HomeViewComponent implements OnInit {
  blankSnippet: ISnippet;
  navSnippetId: string;

  constructor(private api: ApiRequestsService, private router: Router) { 
    this.navSnippetId = "";
    this.blankSnippet = new BlankSnippet();
  }

  ngOnInit(): void {
  }

  createSnippet() {
    //NOTE: Date().toISOString() returns the format: 2020-10-30T20:56:53.299Z
    //this step is just chopping at the 'T' character to create a date string that
    //the server side can handle
    this.blankSnippet.timestamp = new Date().toISOString().split('T')[0];

    var newSnip = <IModifySnippet> {
      info : this.blankSnippet.info,
      language : this.blankSnippet.language,
      content : this.blankSnippet.content,
      name : this.blankSnippet.name,
      password : this.blankSnippet.password,
      timestamp : this.blankSnippet.timestamp
    }

    console.log("created snip");
    console.log(newSnip);
    console.log("sending...");

    this.api.createSnippet(newSnip).subscribe(
      
      
      x => {this.redirectToSnippet(x.id)},
      err => console.error(err),
      () => console.log('Observer got a complete notification')
    );

  }

  redirectToSnippet(snippetId: number) {
    this.router.navigate(['snippet/' + snippetId]);
  }
}