import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {JoinComponent} from './join.component';

const ROUTES: Routes = [
    {
        path: '', component: JoinComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class JoinRoutingModule{}
