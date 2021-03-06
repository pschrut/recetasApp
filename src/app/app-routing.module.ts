import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentPanelComponent } from './components/shared/content-panel/content-panel.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: ':category', component: ContentPanelComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
