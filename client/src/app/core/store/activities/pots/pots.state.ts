import {Injectable} from '@angular/core';
import {Action, State, StateContext} from '@ngxs/store';
import * as actions from './pots.actions';
import {take, tap} from 'rxjs/operators';
import {PotResolver} from 'core/api/pot/pot.resolver';
import {Pot} from 'core/api/pot/pot.model';
import {PushPartialPot, RemovePartialPot} from 'core/store/activities/activities.actions';

@State<Pot[]>({
    name: 'pots',
    defaults: [],
})
@Injectable()
export class PotsState {

    constructor(
        private potResolver: PotResolver,
    ) {
    }

    @Action(actions.AddPot)
    add(ctx: StateContext<Pot[]>, {activityId, input}: actions.AddPot) {
        return this.potResolver.addPot(activityId, input).pipe(
            take(1),
            tap(({data}) => {
                if (data && data.addPot) {
                    ctx.dispatch(new PushPartialPot(activityId, data.addPot.id));
                    ctx.setState([data.addPot, ...ctx.getState()]);
                }
            })
        );
    }

    @Action(actions.UpdatePot)
    update(ctx: StateContext<Pot[]>, {id, input}: actions.UpdatePot) {
        return this.potResolver.updatePot(id, input).pipe(
            take(1),
            tap(({data}) => {
                if (data && data.updatePot) {
                    ctx.setState([...ctx.getState().map(
                        (pot: Pot) => pot.id === id
                            ? {...pot, ...data.updatePot}
                            : pot
                    )]);
                }
            })
        );
    }

    @Action(actions.DeletePot)
    delete(ctx: StateContext<Pot[]>, {activityId, id}: actions.DeletePot) {
        return this.potResolver.deletePot(id).pipe(
            take(1),
            tap(({data}) => {
                if (data && data.deletePot) {
                    ctx.dispatch(new RemovePartialPot(activityId, id));
                    ctx.setState([...ctx.getState().filter(
                        (pot: Pot) => pot.id !== id
                    )]);
                }
            })
        );
    }

    @Action(actions.RemovePotsByActivityId)
    removeByActivityId(ctx: StateContext<Pot[]>, {activityId}: actions.RemovePotsByActivityId) {
        ctx.setState([...ctx.getState().filter(
            (pot: Pot) => pot.activity.id !== activityId
        )]);
    }
}
