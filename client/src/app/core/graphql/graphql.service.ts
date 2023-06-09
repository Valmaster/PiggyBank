import {Injectable} from '@angular/core';
import {ApolloLink, split} from 'apollo-link';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import {Apollo} from 'apollo-angular';
import {HttpClient} from '@angular/common/http';
import {HttpLink} from 'apollo-angular-link-http';
import {environment} from '../../../environments/environment';
import {onError} from 'apollo-link-error';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';
import {OperationDefinitionNode} from 'graphql';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {Store} from '@ngxs/store';
import {Refresh} from 'core/store/auth/auth.actions';
import {timeout} from 'rxjs/operators';

@Injectable()
export class GraphqlService {
    readonly link: ApolloLink;
    readonly wsLink: ApolloLink;
    readonly httpLink: ApolloLink;
    readonly errorLink: ApolloLink;
    readonly wsClient: SubscriptionClient;
    private accessToken: string;

    constructor(
        private apollo: Apollo,
        private httpClient: HttpClient,
        private store: Store
    ) {
        this.httpLink = new HttpLink(httpClient).create({uri: environment.graphql});

        this.wsClient = new SubscriptionClient(environment.subscription, {
            lazy: true,
            // timeout: 2000,
            reconnect: true,
            connectionParams: () => {
                return {
                    headers: this.accessToken ? {authorization: 'Bearer ' + this.accessToken} : {}
                };
            }
        });

        this.errorLink = onError(options => {
            console.log(options);
            if (options.graphQLErrors) {
                options.graphQLErrors.map(error => {
                    console.log('[GQL Error Message] : ', error.message);
                    console.log('[GQL Error Locations] : ', error.locations);
                    console.log('[GQL Error Path] : ', error.path);
                });
            }
            if (options.networkError) {
                console.log('[Network Error] : ', options.networkError.message);
            }
        });

        this.wsLink = new WebSocketLink(this.wsClient);

        this.link = split(({query}) => {
            const {kind, operation} = getMainDefinition(query) as OperationDefinitionNode;
            return kind === 'OperationDefinition' && operation === 'subscription';
        }, this.wsLink, ApolloLink.from([this.errorLink, this.httpLink]));

        apollo.create({
            link: this.link,
            cache: new InMemoryCache(),
            defaultOptions: {
                watchQuery: {fetchPolicy: 'no-cache', errorPolicy: 'none'},
                mutate: {fetchPolicy: 'no-cache', errorPolicy: 'none'},
                query: {fetchPolicy: 'no-cache', errorPolicy: 'none'}
            }
        });

        store.dispatch(new Refresh());
    }

    restart(accessToken?: string): void {
        this.accessToken = accessToken;
        this.wsClient.close(false);
    }
}
