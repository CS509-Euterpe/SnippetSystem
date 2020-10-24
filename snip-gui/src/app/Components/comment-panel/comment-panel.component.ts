import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/models/models';

@Component({
  selector: 'app-comment-panel',
  templateUrl: './comment-panel.component.html',
  styleUrls: ['./comment-panel.component.css']
})
export class CommentPanelComponent implements OnInit {


  //true -> user is actively creating a comment, this means that this is a modal dialogue
  //false -> comment is being displayed in the snippet view
  createMode: boolean;
  @Input() comment: IComment;

  constructor() { }

  ngOnInit(): void {
  }

}
