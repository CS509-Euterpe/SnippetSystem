import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAccessEnum } from 'src/app/models/enums';

@Component({
    selector: 'base-snippet',
    template: '',
    styleUrls: []
    })
export class BaseSnippetComponent implements OnInit {

    private _user = UserAccessEnum.None
    protected route: ActivatedRoute

    constructor( route: ActivatedRoute) {
        this.route = route
    }

    ngOnInit()
    {
        this.route.queryParams
        .subscribe(params => { 
          if (params.user == "creator") {
            this._user = UserAccessEnum.Creator
          }
        });
    }

    get isCreator()
    {
      return this._user == UserAccessEnum.Creator;
    }
  
}