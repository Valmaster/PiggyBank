import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {WelcomeGuard} from 'core/guards/welcome.guard';
import {ShellGuard} from 'core/guards/shell.guard';

export const routes: Routes = [
    {
        path: 'welcome',
        canActivate: [WelcomeGuard],
        loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
    },
    {
        path: 'join',
        children: [
            {
                path: ':code',
                loadChildren: () => import('./pages/join/join.module').then(m => m.JoinModule),
            },
            {
                path: '',
                redirectTo: '/welcome',
                pathMatch: 'full'
            },
        ]
    },
    {
        path: '',
        canActivate: [ShellGuard],
        loadChildren: () => import('./pages/shell/shell.module').then(m => m.ShellModule),
    },
    {
        path: '**',
        loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        ShellGuard,
        WelcomeGuard,
    ],
})
export class AppRoutingModule {
}
