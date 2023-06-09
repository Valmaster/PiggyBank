import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import gql from 'graphql-tag';

@Injectable()
export class InvitationResolver{
    constructor(private apollo: Apollo) {}

    public addInvitation(activityId: string): Observable<any>{
        return this.apollo.mutate<any>({
            variables: {activityId},
            mutation: gql`mutation addInvitation($activityId: String!){
                addInvitation(activityId: $activityId){
                    code
                }
            }`
        });
    }
}
