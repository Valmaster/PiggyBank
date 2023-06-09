import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {AuthState} from 'core/store/auth/auth.state';
import {UserState} from 'core/store/user/user.state';

@Injectable()
export class WelcomeGuard implements CanActivate{


    constructor(
        private store: Store,
        private router: Router,
    ) {}

    canActivate(): boolean | UrlTree {
        const loggedIn = this.store.selectSnapshot(AuthState.loggedIn);
        const user = this.store.selectSnapshot(UserState).id;
        return !(loggedIn && user) || this.router.parseUrl('/');
    }

}
