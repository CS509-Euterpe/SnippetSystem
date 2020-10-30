import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-toolbar',
  templateUrl: './navigation-toolbar.component.html',
  styleUrls: ['./navigation-toolbar.component.css']
})
export class NavigationToolbarComponent implements OnInit {

  navSnippetId: string;

  constructor() {
      this.navSnippetId = "";
   }

  ngOnInit(): void {
  }

}
