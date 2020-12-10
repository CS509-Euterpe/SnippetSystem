import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule,MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule }  from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { NgScrollbarModule } from 'ngx-scrollbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCommentModalDialog, SnippetViewComponent } from './Components/snippet-view/snippet-view.component';
import { PasswordViewComponent } from './Components/password-view/password-view.component';
import { CommentPanelComponent } from './Components/comment-panel/comment-panel.component';
import { HomeViewComponent } from './Components/home-view/home-view.component';
import { AdminViewComponent } from './Components/admin-view/admin-view.component';
import { SnippetPreviewComponent } from './Components/admin-view/snippet-preview/snippet-preview.component';
import { SnippetInfoComponent } from './Components/snippet-info/snippet-info.component';
import { LanguageSelectorComponent } from './Components/language-selector/language-selector.component';
import { SnippetPanelComponent } from './Components/snippet-panel/snippet-panel.component';
import { NavigationToolbarComponent } from './Components/navigation-toolbar/navigation-toolbar.component';
import { NoCommentsPanelComponent } from './Components/no-comments-panel/no-comments-panel.component';
import { WebsocketService } from './Services/websocket.service';
import { PasswordWallComponent } from './password-wall/password-wall.component';


@NgModule({
  declarations: [
    AppComponent,
    SnippetViewComponent,
    PasswordViewComponent,
    CommentPanelComponent,
    HomeViewComponent,
    AdminViewComponent,
    SnippetPreviewComponent,
    SnippetInfoComponent,
    LanguageSelectorComponent,
    SnippetPanelComponent,
    NavigationToolbarComponent,
    AddCommentModalDialog,
    NoCommentsPanelComponent,
    PasswordWallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    AmplifyUIAngularModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CodemirrorModule,
    NgScrollbarModule,
    MatButtonModule,
    MatDatepickerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSelectModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  exports: [
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    WebsocketService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SnippetViewComponent
  ],
})
export class AppModule { }
