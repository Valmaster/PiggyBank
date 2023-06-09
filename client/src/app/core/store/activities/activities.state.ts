import {Action, createSelector, Selector, State, StateContext, Store} from '@ngxs/store';
import {Activity} from 'core/api/activity/activity.model';
import {Injectable} from '@angular/core';
import * as actions from './activities.actions';
import {ActivitiesModel} from './activities.model';
import {take, tap} from 'rxjs/operators';
import {ActivityResolver} from 'core/api/activity/activity.resolver';
import {PotsState} from 'core/store/activities/pots/pots.state';
import {ParticipationsState} from 'core/store/activities/participations/participations.state';
import {Pot} from 'core/api/pot/pot.model';
import {Participation} from 'core/api/participation/participation.model';
import {ActivityUserJunction} from 'core/api/activity-user-junction/activity-user-junction.model';
import {RemovePotsByActivityId} from 'core/store/activities/pots/pots.actions';
import {RemoveActivityById} from './activities.actions';
import {RemoveParticipationsByActivityId} from 'core/store/activities/participations/participations.actions';
import {RemoveActivityUserJunctionByActivityId} from 'core/store/activities/activity-user-junctions/activity-user-junctions.actions';

@State<ActivitiesModel>({
    name: 'activities',
    defaults: {
        total: null,
        hasMore: false,
        partials: [],
        completes: [],
        participations: [],
        pots: [],
        activityUserJunctions: [],
    },
    children: [PotsState, ParticipationsState],
})
@Injectable()
export class ActivitiesState {

    @Selector()
    static total(state: ActivitiesModel): number {
        return state.total;
    }

    @Selector()
    static hasMore(state: ActivitiesModel): boolean {
        return state.hasMore;
    }

    @Selector()
    static totalPartials(state: ActivitiesModel): number {
        return state.partials.length;
    }

    @Selector()
    static partials(state: ActivitiesModel): Activity[] {
        return state.partials;
    }

    static partial(id: string) {
        return createSelector([ActivitiesState], (state: ActivitiesModel): Activity => {
            return state.partials.find(item => item.id === id);
        });
    }

    static complete(id: string) {
        return createSelector([ActivitiesState], (state: ActivitiesModel): Activity => {
            return state.completes.find(item => item.id === id);
        });
    }

    static pot(id: string) {
        return createSelector([ActivitiesState], (state: ActivitiesModel): Pot => {
            return state.pots.find(item => item.id === id);
        });
    }

    static pots(activityId: string) {
        return createSelector([ActivitiesState], (state: ActivitiesModel): Pot[] => {
            return state.pots.filter(item => item.activity.id === activityId);
        });
    }

    static potsLength(activityId: string) {
        return createSelector([ActivitiesState], (state: ActivitiesModel): number => {
            const activity = state.partials.find(a => a.id === activityId);
            return activity.pots.length;
        });
    }

    static junctions(activityId: string) {
        return createSelector([ActivitiesState], (state: ActivitiesModel): ActivityUserJunction[] => {
            return state.activityUserJunctions.filter(item => item.activity.id === activityId);
        });
    }

    static participations(activityId: string) {
        return createSelector([ActivitiesState], (state: ActivitiesModel): Participation[] => {
            return state.participations.filter(item => item.activity.id === activityId);
        });
    }

    static potParticipations(potId: string) {
        return createSelector([ActivitiesState], (state: ActivitiesModel): Participation[] => {
            return state.participations.filter(item => item.pot.id === potId);
        });
    }

    static totalAmountParticipations(activityId: string) {
        let amount = 0;
        return createSelector([ActivitiesState], (state: ActivitiesModel): number => {
            const activity = state.partials.find(a => a.id === activityId);
            activity.participations.map((participation: Participation) => {
                amount += participation.amount;
            });
            const totalAmount = amount;
            amount = 0;
            return totalAmount;
        });
    }

    static totalAmountPotParticipations(potId: string) {
        let amount = 0;
        return createSelector([ActivitiesState], (state: ActivitiesModel): number => {
            state.participations.filter(item => item.pot.id === potId)
                .map((participation: Participation) => {
                    amount += participation.amount;
                });
            const totalAmount = amount;
            amount = 0;
            return totalAmount;
        });
    }

    constructor(private activityResolver: ActivityResolver, private store: Store) {
    }

    @Action(actions.GetActivity)
    getOne(ctx: StateContext<ActivitiesModel>, {id}: actions.GetActivity) {
        const state = ctx.getState();
        if (state.completes.find(item => item.id === id)) {
            return;
        }
        return this.activityResolver.activity(id).pipe(
            take(1),
            tap(({data}) => {
                if (data && data.activity) {
                    const {participations, pots, ...activity} = data.activity;
                    ctx.patchState({
                        completes: [activity, ...state.completes],
                        participations: [...participations, ...state.participations],
                        pots: [...pots, ...state.pots]
                    });
                }
            })
        );
    }

    @Action(actions.GetManyActivities)
    getMany(ctx: StateContext<ActivitiesModel>, {input}: actions.GetManyActivities) {
        const state = ctx.getState();
        const partials = state.partials;
        const total = partials.length;
        if (total !== 0 && input.skip < total) {
            return;
        }
        return this.activityResolver.activities(input).pipe(
            take(1),
            tap(({data}) => {
                if (data && data.activities) {
                    ctx.patchState({
                        total: data.activities.total,
                        hasMore: data.activities.hasMore,
                        partials: [...data.activities.items, ...partials],
                    });
                }
            })
        );
    }

    @Action(actions.AddActivity)
    addOne(ctx: StateContext<ActivitiesModel>, {input}: actions.AddActivity) {
        return this.activityResolver.addActivity(input).pipe(
            take(1),
            tap(({data}) => {
                if (data && data.addActivity) {
                    ctx.patchState({
                        partials: [data.addActivity, ...ctx.getState().partials]
                    });
                }
            })
        );
    }

    @Action(actions.UpdateActivity)
    update(ctx: StateContext<ActivitiesModel>, {id, input}: actions.UpdateActivity) {
        return this.activityResolver.updateActivity(id, input).pipe(
            take(1),
            tap(({data}) => {
                if (data && data.updateActivity) {
                    ctx.patchState({
                        partials: [...ctx.getState().partials.map(item => item.id === id
                            ? {...item, ...data.updateActivity}
                            : item
                        )],
                        completes: [...ctx.getState().completes.map(item => item.id === id
                            ? {...item, ...data.updateActivity}
                            : item
                        )]
                    });
                }
            })
        );
    }

    @Action(actions.DeleteActivity)
    delete(ctx: StateContext<ActivitiesModel>, {id}: actions.DeleteActivity) {
        return this.activityResolver.deleteActivity(id).pipe(
            take(1),
            tap(({data}) => {
                if (data && data.deleteActivity) {
                    ctx.dispatch([
                        new RemovePotsByActivityId(id),
                        new RemoveActivityById(id),
                        new RemoveParticipationsByActivityId(id),
                        new RemoveActivityUserJunctionByActivityId(id)
                    ]);
                }
            })
        );
    }

    @Action(actions.RemoveActivityById)
    removeById(ctx: StateContext<ActivitiesModel>, {id}: actions.RemoveActivityById) {
        ctx.patchState({
            partials: [...ctx.getState().partials.filter(partial => partial.id !== id)],
            completes: [...ctx.getState().completes.filter(complete => complete.id !== id)]
        });
    }

    @Action(actions.PushPartialPot)
    pushPartialPot(ctx: StateContext<ActivitiesModel>, {activityId, id}: actions.PushPartialPot) {
        ctx.patchState({
            partials: [...ctx.getState().partials.map(item => item.id === activityId
                ? {...item, pots: [{id}, ...item.pots]}
                : item
            )]
        });
    }

    @Action(actions.RemovePartialPot)
    removePartialPot(ctx: StateContext<ActivitiesModel>, {activityId, id}: actions.RemovePartialPot) {
        ctx.patchState({
            partials: [...ctx.getState().partials.map(item => item.id === activityId
                ? {...item, pots: item.pots.filter(p => p.id !== id)}
                : item
            )]
        });
    }

    @Action(actions.PushPartialParticipation)
    pushPartialParticipation(ctx: StateContext<ActivitiesModel>, {activityId, amount}: actions.PushPartialParticipation) {
        ctx.patchState({
            partials: [...ctx.getState().partials.map(item => item.id === activityId
                ? {...item, participations: [{amount}, ...item.participations]}
                : item
            )]
        });
    }

    @Action(actions.RemovePartialParticipation)
    removePartialParticipation(ctx: StateContext<ActivitiesModel>, {activityId, amount}: actions.RemovePartialParticipation) {
        let deleted;
        ctx.patchState({
            partials: [...ctx.getState().partials.map(item => item.id === activityId
                ? {
                    ...item, participations: item.participations.map(p => {
                        if (p.amount === amount && !deleted) {
                            deleted = true;
                            return {amount: 0};
                        } else {
                            return p;
                        }
                    })
                }
                : item
            )]
        });
    }
}
