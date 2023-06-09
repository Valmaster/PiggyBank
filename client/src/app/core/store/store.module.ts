import {NgModule} from '@angular/core';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsStoragePluginModule, StorageOption} from '@ngxs/storage-plugin';
import {NgxsRouterPluginModule} from '@ngxs/router-plugin';
import {NgxsModule} from '@ngxs/store';
import {AuthState} from './auth/auth.state';
import {UserState} from './user/user.state';
import {MailService} from '../api/mail/mail.service';
import {MailState} from './mailing/mail.state';
import {ActivitiesState} from './activities/activities.state';
import {PotsState} from './activities/pots/pots.state';
import {NotificationsState} from './notifications/notifications.state';
import {NgxsResetPluginModule} from 'ngxs-reset-plugin';
import {ParticipationsState} from 'core/store/activities/participations/participations.state';
import {ActivityUserJunctionsState} from 'core/store/activities/activity-user-junctions/activity-user-junctions.state';

@NgModule({
    imports: [
        NgxsModule.forRoot([
            AuthState,
            UserState,
            MailState,
            ActivitiesState,
            PotsState,
            NotificationsState,
            ParticipationsState,
            ActivityUserJunctionsState,
        ], {
            developmentMode: true,
            selectorOptions: {suppressErrors: true},
        }),
        NgxsResetPluginModule.forRoot(),
        NgxsStoragePluginModule.forRoot({
            key: ['auth', 'user'],
            storage: StorageOption.LocalStorage,
        }),
        NgxsRouterPluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot(),
    ],
    providers: [MailService],
})
export class StoreModule {
}
