import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Pot} from 'core/api/pot/pot.model';
import {Activity} from 'core/api/activity/activity.model';
import {Participation} from 'core/api/participation/participation.model';
import {Select, Store} from '@ngxs/store';
import {ActivitiesState} from 'core/store/activities/activities.state';
import {UserState} from 'core/store/user/user.state';
import {User} from 'core/api/user/user.model';
import {DeleteActivity} from 'core/store/activities/activities.actions';

@Component({
    selector: 'activity-activities',
    templateUrl: './activities.component.html'
})
export class ActivitiesComponent implements OnInit {

    @Select(UserState) currentUser$: Observable<User>;

    @Input() activityId: string;

    currentUserId: string;

    potsLength$: Observable<number>;
    amountTotal$: Observable<number>;
    activity$: Observable<Activity>;

    editActivity: Activity;

    popup: string;

    constructor(
        private store: Store,
    ) {
    }

    ngOnInit() {
        if (!this.activityId) {
            return;
        }
        this.activity$ = this.store.select(ActivitiesState.partial(this.activityId));
        this.potsLength$ = this.store.select(ActivitiesState.potsLength(this.activityId));
        this.currentUserId = this.store.selectSnapshot(UserState).id;
        this.amountTotal$ = this.store.select(ActivitiesState.totalAmountParticipations(this.activityId));
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
}
