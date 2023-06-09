import {Component, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {ApolloError} from 'apollo-client';
import {Invitation} from 'core/api/invitation/invitation.model';
import {Store} from '@ngxs/store';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthState} from 'core/store/auth/auth.state';
import {switchMap, take, takeUntil} from 'rxjs/operators';
import {PublicResolver} from 'core/api/public/public.resolver';
import {AddActivityUserJunction} from 'core/store/activities/activity-user-junctions/activity-user-junctions.actions';

@Component({
    selector: 'app-join',
    templateUrl: './join.component.html',
    styleUrls: ['/src/assets/styles/pages/join.css'],
})
export class JoinComponent implements OnDestroy {

    private destroy$ = new Subject();
    pending = true;
    error: ApolloError;
    invitation: Invitation;
    loggedIn: boolean;
    hasAccount: boolean;

    constructor(
        private store: Store,
        private router: Router,
        private route: ActivatedRoute,
        private publicResolver: PublicResolver
    ) {
        this.refreshLoggedIn();
        route.params
            .pipe(
                switchMap((params: any) => this.publicResolver.invitationExists(params.code)),
                takeUntil(this.destroy$)
            ).subscribe(
            ({data}) => {
                if (data && data.invitationExists) {
                    this.invitation = data.invitationExists;
                } else {
                    this.router.navigate(['/']);
                }
            }, error => this.error = error
        ).add(() => this.pending = false);
    }

    stay(): void {
        this.router.navigate([window.location.pathname]);
        this.refreshLoggedIn();
    }

    join(): void {
        this.store.dispatch(new AddActivityUserJunction(this.invitation.code))
            .pipe(take(1))
            .subscribe(() => this.router.navigate(['/']));
    }

    refreshLoggedIn(): void {
        this.loggedIn = this.store.selectSnapshot(AuthState.loggedIn);
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

}
