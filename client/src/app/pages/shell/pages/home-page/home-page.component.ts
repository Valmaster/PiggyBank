import {Component} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {ActivitiesState} from 'core/store/activities/activities.state';
import {Activity} from 'core/api/activity/activity.model';
import {take} from 'rxjs/operators';
import {DeleteActivity, GetManyActivities} from 'core/store/activities/activities.actions';
import {UserState} from 'core/store/user/user.state';
import {User} from 'core/api/user/user.model';


@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['/src/assets/styles/pages/home-page.css'],
})

export class HomePageComponent {
    @Select(ActivitiesState.total) total$: Observable<number>;
    @Select(ActivitiesState.hasMore) hasMore$: Observable<boolean>;
    @Select(ActivitiesState.partials) partials$: Observable<Activity[]>;
    @Select(UserState) currentUser$: Observable<User>;
    @Select(ActivitiesState.totalPartials) totalPartials$: Observable<number>;
    popup: string;
    editActivity: Activity;

    constructor(private store: Store) {
        store.select(ActivitiesState.total).pipe(
            take(1))
            .subscribe((total: number) => {
                if (total === null) {
                    store.dispatch(new GetManyActivities({take: 30, skip: 0}));
                }
            });
    }

    togglePopUp(popup: string) {
        this.popup = popup === this.popup ? null : popup;
    }

    onDelete(activityId: string) {
        const confirmation = confirm('Etes-vous sur de supprimer l\'activité?');
        if (!confirmation) {
            return;
        }
        this.store.dispatch(new DeleteActivity(activityId));
    }

    getMore(): void {
        const limit = 30;
        const skip = this.store.selectSnapshot(ActivitiesState.totalPartials);
        this.store.dispatch(new GetManyActivities({take: limit, skip}))
            .pipe(take(1))
            .subscribe();
    }

}
