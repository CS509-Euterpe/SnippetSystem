import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SnippetViewComponent } from './Components/snippet-view/snippet-view.component';
import { PasswordViewComponent } from './Components/password-view/password-view.component';
import { HomeViewComponent } from './Components/home-view/home-view.component';
import { AdminViewComponent } from './Components/admin-view/admin-view.component';

const routes: Routes = [
  {path: 'home', component: HomeViewComponent},
  {path: 'snippet/:id', component: SnippetViewComponent},
  {path: 'admin', component: AdminViewComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: HomeViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
