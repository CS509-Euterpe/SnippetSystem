import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SnippetViewComponent } from './Components/snippet-view/snippet-view.component';
import { PasswordViewComponent } from './Components/password-view/password-view.component';
import { CommentPanelComponent } from './Components/comment-panel/comment-panel.component';
import { HomeViewComponent } from './Components/home-view/home-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    SnippetViewComponent,
    PasswordViewComponent,
    CommentPanelComponent,
    HomeViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
