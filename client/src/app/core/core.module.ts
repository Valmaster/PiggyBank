import {Injector, NgModule} from '@angular/core';
import {ApiModule} from './api/api.module';
import {InterceptorsModule} from './interceptors/interceptors.module';
import {StoreModule} from './store/store.module';
import {InjectorService} from './services/injector.service';
import {AutomationModule} from 'core/automation/automation.module';
import {GraphqlModule} from 'core/graphql/graphql.module';

@NgModule({
    imports: [
        StoreModule,
        GraphqlModule,
        ApiModule,
        InterceptorsModule,
        AutomationModule,
    ]
})
export class CoreModule {
    constructor(public injector: Injector) {
        InjectorService.injector = injector;
    }
}
