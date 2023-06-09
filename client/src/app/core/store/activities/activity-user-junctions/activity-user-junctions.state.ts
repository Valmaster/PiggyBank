import {Action, State, StateContext, Store} from '@ngxs/store';
import {ActivityUserJunction} from 'core/api/activity-user-junction/activity-user-junction.model';
import {Injectable} from '@angular/core';
import {ActivityUserJunctionResolver} from 'core/api/activity-user-junction/activity-user-junction.resolver';
import * as actions from './activity-user-junctions.actions';
import {take, tap} from 'rxjs/operators';
import {Navigate} from '@ngxs/router-plugin';
import {UserState} from 'core/store/user/user.state';
import {RemoveParticipationsByActivityId, RemoveParticipationsByUserId} from 'core/store/activities/participations/participations.actions';
import {RemovePotsByActivityId} from 'core/store/activities/pots/pots.actions';
import {RemoveActivityById} from 'core/store/activities/activities.actions';

@State<ActivityUserJunction[]>({
    name: 'activityUserJunctions',
    defaults: []
})
@Injectable()
export class ActivityUserJunctionsState {

    constructor(
        private store: Store,
        private activityUserJunctionResolver: ActivityUserJunctionResolver
    ) {
    }

    @Action(actions.AddActivityUserJunction)
    add(ctx: StateContext<ActivityUserJunction[]>, {invitationCode}: actions.AddActivityUserJunction) {
        return this.activityUserJunctionResolver.addActivityUserJunction(invitationCode).pipe(
            take(1),
            tap(({data}) => {
                if (data && data.addActivityUserJunction) {
                    ctx.dispatch(new Navigate(['/activities/' + data.addActivityUserJunction.activity.id]));
                }
            })
        );
    }

    @Action(actions.DeleteActivityUserJunction)
    delete(ctx: StateContext<ActivityUserJunction[]>, {id}: actions.DeleteActivityUserJunction) {
        return this.activityUserJunctionResolver.deleteActivityUserJunction(id).pipe(
            take(1),
            tap(({data}) => {

                const state = ctx.getState();
                const currentUser = this.store.selectSnapshot(UserState);
                const junction = state.find(item => item.id === id);

                ctx.setState([...state.filter(
                    (j: ActivityUserJunction) => j.id !== id
                )]);

                ctx.dispatch(junction.user.id !== currentUser.id
                    ? [ new RemoveParticipationsByUserId(junction.user.id)]
                    : [ new RemoveParticipationsByActivityId(junction.activity.id),
                        new RemovePotsByActivityId(junction.activity.id),
                        new RemoveActivityById(junction.activity.id),
                        new Navigate(['/activities'])
                    ]
                );

            })
        );
    }

    @Action(actions.RemoveActivityUserJunctionByActivityId)
    RemoveByActivityId(ctx: StateContext<ActivityUserJunction[]>, {activityId}: actions.RemoveActivityUserJunctionByActivityId) {
        ctx.setState([...ctx.getState().filter(
            (junction: ActivityUserJunction) => junction.activity.id !== activityId
        )]);
    }
}
