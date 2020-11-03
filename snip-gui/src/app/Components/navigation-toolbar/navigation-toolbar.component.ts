import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestsService } from 'src/app/Services/api-requests.service';

@Component({
  selector: 'app-navigation-toolbar',
  templateUrl: './navigation-toolbar.component.html',
  styleUrls: ['./navigation-toolbar.component.css']
})
export class NavigationToolbarComponent implements OnInit {

  navSnippetId: string;

  constructor(private api: ApiRequestsService, private router: Router) {
      this.navSnippetId = "";
   }

  ngOnInit(): void {
  }

  redirectToSnippet(snipId: string)
  {
    var id = parseInt(snipId);
    this.router.navigate(['snippet/' + id]);
  }

}
