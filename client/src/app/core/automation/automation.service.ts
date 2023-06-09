import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {AuthState} from 'core/store/auth/auth.state';
import {InvitationResolver} from 'core/api/invitation/invitation.resolver';
import {GraphqlService} from 'core/graphql/graphql.service';

@Injectable()
export class AutomationService {
    constructor(
        private store: Store,
        private invitationResolver: InvitationResolver,
        private graphqlService: GraphqlService
    ) {
        store.select(AuthState.loggedIn)
            .subscribe(async (logged: boolean) => {
                if (logged) {
                    store.select(AuthState.accessToken)
                        .subscribe((accessToken: string) => this.graphqlService.restart(accessToken));
                }
            });
    }
}
