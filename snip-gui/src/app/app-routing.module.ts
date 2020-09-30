import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SnippetViewComponent } from './Components/snippet-view/snippet-view.component';
import { PasswordViewComponent } from './Components/password-view/password-view.component';
import { HomeViewComponent } from './Components/home-view/home-view.component';

const routes: Routes = [
  {path: 'home', component: HomeViewComponent},
  {path: 'snippet-view', component: SnippetViewComponent},
  {path: 'password-view', component: PasswordViewComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: HomeViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
