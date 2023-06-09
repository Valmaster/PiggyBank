import {State, Action, StateContext} from '@ngxs/store';
import * as actions from './user.actions';
import {Injectable} from '@angular/core';
import {UserModel} from 'core/store/user/user.model';
import {UserResolver} from 'core/api/user/user.resolver';

@State<UserModel>({
    name: 'user',
    defaults: {
        id: null,
        email: null,
        password: null,
        username: null,
        roles: [],
        createdAt: null,
        updatedAt: null,
        myActivities: [],
        notifications: [],
        activityUserJunctions: [],
    },
})
@Injectable()
export class UserState {

    constructor(private userResolver: UserResolver) {}

    @Action(actions.PatchUser)
    patch(ctx: StateContext<UserModel>, action: actions.PatchUser) {
        ctx.patchState(action.payload);
    }
}
