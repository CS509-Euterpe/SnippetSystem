import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }  from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SnippetViewComponent } from './Components/snippet-view/snippet-view.component';
import { PasswordViewComponent } from './Components/password-view/password-view.component';
import { CommentPanelComponent } from './Components/comment-panel/comment-panel.component';
import { HomeViewComponent } from './Components/home-view/home-view.component';
import { AdminViewComponent } from './Components/admin-view/admin-view.component';
import { SnippetPreviewComponent } from './Components/admin-view/snippet-preview/snippet-preview.component';
import { SnippetInfoComponent } from './Components/snippet-info/snippet-info.component';
import { LanguageSelectorComponent } from './Components/language-selector/language-selector.component';
import { SnippetPanelComponent } from './Components/snippet-panel/snippet-panel.component';
import { NavigationToolbarComponent } from './Components/navigation-toolbar/navigation-toolbar.component'


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
    NavigationToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AmplifyUIAngularModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CodemirrorModule,
    NgScrollbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSelectModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
