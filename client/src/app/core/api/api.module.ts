import {NgModule} from '@angular/core';
import {PublicResolver} from 'core/api/public/public.resolver';
import {NotificationResolver} from 'core/api/notification/notification.resolver';
import {ActivityResolver} from 'core/api/activity/activity.resolver';
import {InvitationResolver} from 'core/api/invitation/invitation.resolver';
import {PotResolver} from 'core/api/pot/pot.resolver';
import {UserResolver} from 'core/api/user/user.resolver';
import {ParticipationResolver} from 'core/api/participation/participation.resolver';
import {ActivityUserJunctionResolver} from 'core/api/activity-user-junction/activity-user-junction.resolver';

@NgModule({
    providers: [
        PublicResolver,
        NotificationResolver,
        ActivityResolver,
        InvitationResolver,
        PotResolver,
        UserResolver,
        ParticipationResolver,
        ActivityUserJunctionResolver,
    ]
})
export class ApiModule {
}

