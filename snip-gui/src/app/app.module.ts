import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SnippetViewComponent } from './Components/snippet-view/snippet-view.component';
import { PasswordViewComponent } from './Components/password-view/password-view.component';
import { CommentPanelComponent } from './Components/comment-panel/comment-panel.component';
import { HomeViewComponent } from './Components/home-view/home-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminViewComponent } from './Components/admin-view/admin-view.component';
import { SnippetPreviewComponent } from './Components/admin-view/snippet-preview/snippet-preview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule}  from '@angular/material/input'
import { MatToolbarModule } from '@angular/material/toolbar'

@NgModule({
  declarations: [
    AppComponent,
    SnippetViewComponent,
    PasswordViewComponent,
    CommentPanelComponent,
    HomeViewComponent,
    AdminViewComponent,
    SnippetPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AmplifyUIAngularModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
