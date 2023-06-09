import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {NotFoundComponent} from './not-found.component';

const ROUTES: Routes = [
    {
        path: '', component: NotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class NotFoundRoutingModule{}
