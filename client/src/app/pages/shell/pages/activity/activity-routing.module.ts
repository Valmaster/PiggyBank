import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ActivityComponent} from './activity.component';

const ROUTES = [
    {
        path: '',
        children: [
            {
                path: ':id',
                component: ActivityComponent,
            },
            {
                path: '',
                redirectTo: '/',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class ActivityRoutingModule {
}
