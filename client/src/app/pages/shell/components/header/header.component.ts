import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AuthState} from 'core/store/auth/auth.state';
import {Observable, Subject} from 'rxjs';
import {UserState} from 'core/store/user/user.state';
import {Logout} from 'core/store/auth/auth.actions';
import {User} from 'core/api/user/user.model';
import {NotificationsState} from 'core/store/notifications/notifications.state';
import {Notification} from 'core/api/notification/notification.model';
import {GetNotifications, ReadNotification} from 'core/store/notifications/notifications.actions';
import {map, mergeMap, takeUntil} from 'rxjs/operators';
import {ActivitiesState} from 'core/store/activities/activities.state';
import {Activity} from 'core/api/activity/activity.model';


@Component({
    selector: 'shell-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnDestroy {

    @Select(AuthState.loggedIn) isLoggedIn$: Observable<boolean>;
    @Select(UserState) currentUser$: Observable<User>;
    @Select(NotificationsState.items) notif$: Observable<Notification[]>;
    @Select(ActivitiesState.partials) partials$: Observable<Activity[]>;

    public notifications: Notification[];
    public isUserOfActivity: boolean;
    public location = window.location.origin;
    public show = false;

    private destroy$ = new Subject();



    constructor(private store: Store) {
        store.dispatch(new GetNotifications({take: 8, skip: 0})).pipe(
            takeUntil(this.destroy$),
            mergeMap(() => store.select(NotificationsState.items)),
        ).subscribe();
        this.partials$.pipe(
            takeUntil(this.destroy$),
            mergeMap(() => store.select(ActivitiesState.partials)),
        ).subscribe((activities: Activity[]) => {
            activities.map((activity: Activity) => {
                this.currentUser$.subscribe((user: User) => {
                    if (user.id === activity.user.id) {
                        this.notif$.subscribe((notifications: Notification[]) => {
                            notifications.map((notification: Notification) => {
                                if (notification.relatedId === activity.id) {
                                    this.notifications = notifications;
                                }
                            });
                        });
                    }
                });
            });
        });
    }

    usedNotif(id) {
        this.store.dispatch(new ReadNotification(id));
    }

    toggle() {
        this.show = !this.show;
    }

    public logout() {
        this.store.dispatch(new Logout());
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }


}
