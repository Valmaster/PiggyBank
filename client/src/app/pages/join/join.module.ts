import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {JoinRoutingModule} from './join-routing.module';
import {JoinComponent} from './join.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        JoinRoutingModule
    ],
    declarations: [
        JoinComponent
    ]
})
export class JoinModule {
}
