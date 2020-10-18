import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-panel',
  templateUrl: './comment-panel.component.html',
  styleUrls: ['./comment-panel.component.css']
})
export class CommentPanelComponent implements OnInit {


  //true -> user is actively creating a comment, this means that this is a modal dialogue
  //false -> comment is being displayed in the snippet view
  createMode: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
