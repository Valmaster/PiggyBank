import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './welcome.component';
import {NgModule} from '@angular/core';

const ROUTES: Routes = [
  {
    path: '', component: WelcomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class WelcomeRoutingModule{}
