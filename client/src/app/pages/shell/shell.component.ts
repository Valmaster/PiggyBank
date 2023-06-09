import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {take, tap} from 'rxjs/operators';
import {PatchNotification} from 'core/store/notifications/notifications.actions';
import {NotificationResolver} from 'core/api/notification/notification.resolver';
import {Subscription} from 'rxjs';
import {AuthState} from 'core/store/auth/auth.state';

@Component({
    selector: 'app-shell',
    templateUrl: './shell.component.html'
})
export class ShellComponent implements OnDestroy, OnInit {

    private subscription: Subscription;

    constructor(
        private store: Store,
        private notificationResolver: NotificationResolver
    ) {
    }

    ngOnInit() {
        this.store.select(AuthState.loggedIn).pipe(
            take(1)
        ).subscribe(logged => {
            this.subscription = this.notificationResolver.receivedNotification()
                .subscribe(result => {
                    if (result && result.data && result.data.receivedNotification) {
                        this.store.dispatch(new PatchNotification(result.data.receivedNotification));
                    }
                });
        }, error => console.log(error)
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
