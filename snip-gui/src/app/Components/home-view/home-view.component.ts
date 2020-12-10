import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestsService } from 'src/app/Services/api-requests.service';
import { IModifySnippet, ISnippet } from 'src/app/models/models';
import { BlankSnippet } from 'src/app/models/stubs';
import { SnackbarService } from 'src/app/Services/snackbar.service';


@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})

export class HomeViewComponent implements OnInit {
  blankSnippet: ISnippet;
  navSnippetId: string;

  constructor(
    private api: ApiRequestsService,
    private router: Router,
    private snackbar: SnackbarService
  ) { 
    this.navSnippetId = "";
    this.blankSnippet = new BlankSnippet();
  }

  ngOnInit(): void {
  }

  createSnippet() {

    //"YYYY-MM-DD HH:mm:SS" format
    this.blankSnippet.timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

    var newSnip = <IModifySnippet> {
      info : this.blankSnippet.info,
      language : this.blankSnippet.language,
      content : this.blankSnippet.content,
      name : this.blankSnippet.name,
      password : this.blankSnippet.password,
      timestamp : this.blankSnippet.timestamp
    }

    this.snackbar.showMessage("Creating your snippet...")

    this.api.createSnippet(newSnip).subscribe(
      x => this.redirectToSnippet(x.id),
      err => this.snackbar.showError(err)
    );
  }

  redirectToSnippet(snippetId: number) {
    this.router.navigateByUrl('snippet/' + snippetId + '?user=creator');
  }
}