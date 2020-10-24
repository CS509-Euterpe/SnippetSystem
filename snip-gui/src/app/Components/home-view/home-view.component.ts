import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { LanguageTypeEnum } from 'src/app/models/enums';
import { ISnippet } from 'src/app/models/models';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})

export class HomeViewComponent implements OnInit {

  //create this obj so we can use it for drop-down list values
  LanguageTypeEnum = LanguageTypeEnum;
  newSnipForm; //snippet form...

  constructor(private formBuilder: FormBuilder) { 
    this.newSnipForm = formBuilder.group({
      userName: '',
      password: ''
    })
  }

  newSnippet: ISnippet;
  userName: String;
  codeBlock: String;
  selectedLanguage: LanguageTypeEnum;
  infoBlock: String; 
  password: String = "";

  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      ctrl1: this.formBuilder.control('')
    });
  }

  createSnippet() {
    //builds out the newSnippet object based on what the user entered on the page in the "Create a new snippet" form
    console.log("yuh,,, it worked");

  }

}
