import {NgModule} from '@angular/core';
import {ApolloModule} from 'apollo-angular';
import {HttpLinkModule} from 'apollo-angular-link-http';
import {HttpClientModule} from '@angular/common/http';
import {GraphqlService} from 'core/graphql/graphql.service';

@NgModule({
    exports: [
        ApolloModule,
        HttpLinkModule,
        HttpClientModule,
    ],
    providers: [
        GraphqlService,
    ],
})
export class GraphqlModule {
    constructor(private graphqlService: GraphqlService) {}
}
