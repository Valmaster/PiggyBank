import {NgModule} from '@angular/core';
import {HomePageComponent} from './home-page.component';
import {CommonModule} from '@angular/common';
import {HomePageRoutingModule} from './home-page-routing.module';
import {SharedModule} from '../../../../shared/shared.module';
import {AddActivityComponent} from './components/add-activity/add-activity.component';
import {DirectivesModule} from 'core/directives/directives.module';
import {UpdateActivityComponent} from './components/update-activity/update-activity.component';
import {ActivitiesComponent} from './components/activities/activities.component';


@NgModule({
    imports: [
        CommonModule,
        HomePageRoutingModule,
        SharedModule,
        DirectivesModule,
    ],
    declarations: [
        HomePageComponent,
        AddActivityComponent,
        UpdateActivityComponent,
        ActivitiesComponent
    ],
})
export class HomePageModule {
}
