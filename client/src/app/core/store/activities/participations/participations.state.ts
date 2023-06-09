import {Action, createSelector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ParticipationResolver} from 'core/api/participation/participation.resolver';
import * as actions from './participations.actions';
import {take, tap} from 'rxjs/operators';
import {Participation} from 'core/api/participation/participation.model';
import {PushPartialParticipation, RemovePartialParticipation, RemovePartialPot} from 'core/store/activities/activities.actions';

@State<Participation[]>({
    name: 'participations',
    defaults: [],
})
@Injectable()
export class ParticipationsState {

    constructor(private participationResolver: ParticipationResolver) {
    }

    @Action(actions.AddParticipation)
    add(ctx: StateContext<Participation[]>, {activityId, potId, input}: actions.AddParticipation) {
        return this.participationResolver.addParticipation(potId, input).pipe(
            take(1),
            tap(({data}) => {
                if (data && data.addParticipation) {
                    ctx.dispatch(new PushPartialParticipation(activityId, data.addParticipation.amount));
                    ctx.setState([...ctx.getState(), data.addParticipation]);
                }
            })
        );
    }

    @Action(actions.UpdateParticipation)
    update(ctx: StateContext<Participation[]>, {id, input}: actions.UpdateParticipation) {
        return this.participationResolver.updateParticipation(id, input).pipe(
            take(1),
            tap(({data}) => {
                if (data && data.updateParticipation) {
                    ctx.setState([...ctx.getState().map(
                        (participation: Participation) => participation.id === id
                            ? {...participation, ...data.updateParticipation}
                            : participation
                    )]);
                }
            })
        );
    }

    @Action(actions.DeleteParticipation)
    delete(ctx: StateContext<Participation[]>, {activityId, id}: actions.DeleteParticipation) {
        const amount = ctx.getState().find(item => item.id === id).amount;
        return this.participationResolver.deleteParticipation(id).pipe(
            take(1),
            tap(({data}) => {
                if (data && data.deleteParticipation) {
                    ctx.dispatch(new RemovePartialParticipation(activityId, amount));
                    ctx.setState([...ctx.getState().filter(
                        (participation: Participation) => participation.id !== id
                    )]);
                }
            })
        );
    }

    @Action(actions.RemoveParticipationsByActivityId)
    removeByActivityId(ctx: StateContext<Participation[]>, {activityId}: actions.RemoveParticipationsByActivityId) {
        ctx.setState([...ctx.getState().filter(
            (participation: Participation) => participation.activity.id !== activityId
        )]);
    }

    @Action(actions.RemoveParticipationsByUserId)
    removeByUserId(ctx: StateContext<Participation[]>, {userId}: actions.RemoveParticipationsByUserId) {
        ctx.setState([...ctx.getState().filter(
            (participation: Participation) => participation.user.id !== userId
        )]);
    }

}
