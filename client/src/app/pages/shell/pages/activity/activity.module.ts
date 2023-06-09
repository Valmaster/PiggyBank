import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../../shared/shared.module';
import {DirectivesModule} from 'core/directives/directives.module';
import {ActivityComponent} from './activity.component';
import {ActivityRoutingModule} from './activity-routing.module';
import {AddPotComponent} from './components/add-pot/add-pot.component';
import {UpdatePotComponent} from './components/update-pot/update-pot.component';
import {AddInvitationComponent} from './components/add-invitation/add-invitation.component';
import {AddParticipationComponent} from './components/add-participation/add-participation.component';
import {UpdateParticipationComponent} from './components/update-participation/update-participation.component';
import {PotComponent} from './components/pot/pot.component';
import {PotExportPdfComponent} from './components/pot-export-pdf/pot-export-pdf.component';


@NgModule({
    imports: [
        CommonModule,
        ActivityRoutingModule,
        SharedModule,
        DirectivesModule,
    ],
    declarations: [
        ActivityComponent,
        AddPotComponent,
        UpdatePotComponent,
        AddInvitationComponent,
        AddParticipationComponent,
        UpdateParticipationComponent,
        PotComponent,
        PotExportPdfComponent
    ],
})
export class ActivityModule {
}
