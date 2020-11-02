import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from 'src/app/Services/snackbar.service'
import { ISnippet, DtoToSnippet } from 'src/app/models/models';
import { SnippetStub } from 'src/app/models/stubs';
import { ApiRequestsService } from 'src/app/Services/api-requests.service';

@Component({
  selector: 'app-snippet-view',
  templateUrl: './snippet-view.component.html',
  styleUrls: ['./snippet-view.component.css']
})
export class SnippetViewComponent implements OnInit {

  snippet: ISnippet
  id: string

  constructor(
    private route: ActivatedRoute,
    private api: ApiRequestsService,
    private snackbar: SnackbarService
  ) {
   }

  ngOnInit(): void {    
    this.id = this.getRouteId();
    
    this.api.getSnippet(+this.id).subscribe(
      dto => {
        this.snippet = DtoToSnippet(dto)
        console.log(dto)
        console.log(this.snippet)
      },
      error => this.snackbar.showError(error.message)
    )
  }

  getRouteId(): string {
    return this.route.snapshot.paramMap.get('id');
  }

  save(): void {
    console.log("Saving snippet!")
    this.snackbar.showMessage("Saved!")
  }


}
