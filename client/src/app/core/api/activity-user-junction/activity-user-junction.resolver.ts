import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import gql from 'graphql-tag';

@Injectable()
export class ActivityUserJunctionResolver {
    constructor(private apollo: Apollo) {
    }

    public addActivityUserJunction(invitationCode: string): Observable<any> {
        return this.apollo.mutate<any>({
            variables: {invitationCode},
            mutation: gql`mutation addActivityUserJunction($invitationCode: String!){
                addActivityUserJunction(invitationCode: $invitationCode) {
                    activity{
                        id
                    }
                }
            }`
        });
    }

    public deleteActivityUserJunction(id: number): Observable<any> {
        return this.apollo.mutate<any>({
            variables: {id},
            mutation: gql`mutation deleteActivityUserJunction($id: Float!){
                deleteActivityUserJunction(id: $id)
            }`
        });
    }

}
