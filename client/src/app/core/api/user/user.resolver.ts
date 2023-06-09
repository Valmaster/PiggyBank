import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import gql from 'graphql-tag';

@Injectable()
export class UserResolver{
    constructor(private apollo: Apollo) {
    }

    user(id: string): Observable<any> {
        return this.apollo.watchQuery<any>({
            variables: {id},
            query: gql`query user($id: String!) {
                user(id: $id) {
                    id
                    username
                    email
                    roles
                }
            }`
        }).valueChanges;
    }

    me(): Observable<any> {
        return this.apollo.watchQuery<any>({
            query: gql`query {
                me{
                    id
                    username
                    email
                    roles
                }
            }`
        }).valueChanges;
    }
}
