import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShellRoutingModule} from './shell-routing.module';
import {HeaderComponent} from './components/header/header.component';
import {ShellComponent} from './shell.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ShellRoutingModule,
        SharedModule,
    ],
    declarations: [
        HeaderComponent,
        ShellComponent,
    ],
})
export class ShellModule {
}
