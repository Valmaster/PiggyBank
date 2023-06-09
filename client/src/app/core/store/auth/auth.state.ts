import {AuthModel} from './auth.model';
import {State, Selector, Action, StateContext} from '@ngxs/store';
import * as actions from './auth.actions';
import {take, tap} from 'rxjs/operators';
import {Navigate} from '@ngxs/router-plugin';
import {PatchUser} from '../user/user.actions';
import {Injectable} from '@angular/core';
import {PublicResolver} from 'core/api/public/public.resolver';
import {StateReset, StateResetAll} from 'ngxs-reset-plugin';
import {UserState} from 'core/store/user/user.state';

@State<AuthModel>({
    name: 'auth',
    defaults: {
        accessToken: null,
        refreshToken: null,
        refreshing: false,
    },
})
@Injectable()
export class AuthState {

    @Selector()
    static accessToken(state: AuthModel): string {
        return state.accessToken;
    }

    @Selector()
    static refreshToken(state: AuthModel): string {
        return state.refreshToken;
    }

    @Selector()
    static loggedIn(state: AuthModel): boolean {
        return !!state.accessToken;
    }

    @Selector()
    static refreshing(state: AuthModel): boolean {
        return state.refreshing;
    }

    constructor(
        private publicResolver: PublicResolver,
    ) {
    }

    @Action(actions.Login)
    login(ctx: StateContext<AuthModel>, action: actions.Login) {
        return this.publicResolver
            .login(action.input)
            .pipe(
                take(1),
                tap(({data}) => {
                    if (data && data.login) {
                        ctx.setState({
                            accessToken: data.login.accessToken,
                            refreshToken: data.login.refreshToken,
                            refreshing: false,
                        });
                        ctx.dispatch([
                            new PatchUser(data.login.user),
                            new Navigate(['/'])
                        ]);
                    }
                })
            );
    }

    @Action(actions.Refresh)
    refresh(ctx: StateContext<AuthModel>) {
        const refreshToken = ctx.getState().refreshToken;
        if (!refreshToken) {
            return;
        }
        ctx.patchState({
            refreshing: true,
        });
        return this.publicResolver.refresh({refreshToken}).pipe(
            take(1),
            tap(({data}) => {
                if (data && data.refresh) {
                    ctx.patchState({
                        accessToken: data.refresh.accessToken,
                        refreshToken: data.refresh.refreshToken,
                    });
                }
            }),
            tap(() =>
                ctx.patchState({
                    refreshing: false,
                })
            )
        );
    }

    @Action(actions.Logout)
    logOut(ctx: StateContext<AuthModel>) {
        ctx.dispatch([
            new StateResetAll(),
            new StateReset(AuthState, UserState),
            new Navigate(['/welcome'])
        ]);
    }

    @Action(actions.Register)
    register(ctx: StateContext<AuthModel>, {input}: actions.Register) {
        return this.publicResolver.register(input).pipe(
            take(1),
            tap(({data}) => {
                if (data && data.register) {
                    ctx.setState({
                        accessToken: data.register.accessToken,
                        refreshToken: data.register.refreshToken,
                        refreshing: false,
                    });
                    ctx.dispatch([
                        new PatchUser(data.register.user),
                        new Navigate(['/'])
                    ]);
                }
            })
        );
    }
}
