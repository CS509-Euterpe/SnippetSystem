import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { LanguageTypeEnum, UserAccessEnum } from 'src/app/models/enums';
import { Snippet, User } from 'src/app/models/models';
/* 3rd party libs */
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

  }

  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      ctrl1: this.formBuilder.control('')
    });
  }

  createSnippet(snip: SnipForm) {
    
    //build up a new snippet obj
    var newUsr = <User> {
                         type: UserAccessEnum.Creator,//re think this part. how do we set the creator's "fingerprint" on the snippet?
                         name: snip.username
                        }

    var newTime = new Date();
    var newId = uuid();

    //create the snippet
    var newSnip = <Snippet> {
      id: newId,
      path: "/snippets/" + newId,
      creator: newUsr,
      comments: null, 
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
