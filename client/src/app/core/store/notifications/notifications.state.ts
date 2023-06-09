import {Action, Selector, State, StateContext} from '@ngxs/store';
import {NotificationsModel} from './notifications.model';
import {Injectable} from '@angular/core';
import * as actions from './notifications.actions';
import {take, tap} from 'rxjs/operators';
import {NotificationResolver} from 'core/api/notification/notification.resolver';
import {Notification} from 'core/api/notification/notification.model';

@State<NotificationsModel>({
    name: 'notifications',
    defaults: {
        total: null,
        hasMore: false,
        items: [],
    },
})
@Injectable()
export class NotificationsState {

    @Selector()
    static items(state: NotificationsModel): Notification[] {
        return state.items;
    }

    constructor(
        private notificationResolver: NotificationResolver,
    ) {}

    @Action(actions.GetNotifications)
    getNotifications(ctx: StateContext<NotificationsModel>, action: actions.GetNotifications) {
        return this.notificationResolver.notifications(action.input).pipe(
            take(1),
            tap(({data}) => {
                if (data && data.notifications) {
                    ctx.patchState({
                        total: data.notifications.total,
                        hasMore: data.notifications.hasMore,
                        items: [...ctx.getState().items, ...data.notifications.items],
                    });
                }
            })
        );
    }

    @Action(actions.ReadNotification)
    readNotification(ctx: StateContext<NotificationsModel>, action: actions.ReadNotification) {
        return this.notificationResolver.readNotification(action.id).pipe(
            take(1),
            tap(({data}) => {
                if (data && data.readNotification) {
                    ctx.patchState({
                        items: [...ctx.getState().items.map(item => item.id === data.readNotification.id ? data.readNotification : item)]
                    });
                }
            })
        );
    }

    @Action(actions.PatchNotification)
    patchNotification(ctx: StateContext<NotificationsModel>, action: actions.PatchNotification) {
        ctx.patchState({
            items: [action.notification, ...ctx.getState().items]
        });
    }

}
