import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISnippet, ISnippetDto } from 'src/app/models/models';
import { BlankSnippet, SnippetStub } from 'src/app/models/stubs';
import { ApiRequestsService } from 'src/app/Services/api-requests.service';

@Component({
  selector: 'app-snippet-view',
  templateUrl: './snippet-view.component.html',
  styleUrls: ['./snippet-view.component.css']
})
export class SnippetViewComponent implements OnInit {

  snippet: ISnippet
  id: number

  constructor(
    private api: ApiRequestsService,
    private route: ActivatedRoute
  )
  {
    this.snippet = new BlankSnippet(); //temporary while the page is loading
  }

  ngOnInit(): void {    
    this.id = this.getRouteId();
    //call out to server to fetch the snippet
    this.getSnippetBody(this.id);
  }

  getRouteId(): number {
    var strId = this.route.snapshot.paramMap.get('id');
    return parseInt(strId);
  }

  getSnippetBody(snipId: number): void {

    this.api.getSnippet(snipId).subscribe(
      x => {
        this.snippet = x as ISnippet;
        this.snippet.isCreating = false;
        console.log('snippet loaded');
          }, 
      err => {
        console.error(err);
      },
      () => console.log('get snippet observer complete')
    );

  }

  save(): void {
    //send update snippet request
    console.log('saving...')
    this.api.updateSnippet(this.snippet).subscribe(
      x => {
        console.log(x);
      },
      err => console.error(err),
      () => console.log('update snippet oberver complete')
    )

    //all out to get again -- refresh the page elements
    this.getSnippetBody(this.snippet.id);
  }

}
