import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ShellComponent} from './shell.component';

const ROUTES: Routes = [{
    path: '', component: ShellComponent, children: [
        {
            path: '',
            loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule)
        },
        {
            path: 'activity',
            loadChildren: () => import('./pages/activity/activity.module').then(m => m.ActivityModule)
        },
        {
            path: '**',
            loadChildren: () => import('../not-found/not-found.module').then(m => m.NotFoundModule)
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class ShellRoutingModule {
}
