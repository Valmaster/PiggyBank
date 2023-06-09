import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {ActivitiesInput} from 'core/api/activity/inputs/activities.input';
import {Observable} from 'rxjs';
import {AddActivityInput} from 'core/api/activity/inputs/add-activity.input';
import {UpdateActivityInput} from 'core/api/activity/inputs/update-activity.input';
import gql from 'graphql-tag';
import {ActivityFragment} from 'core/api/activity/fragments/activity.fragment';

@Injectable()
export class ActivityResolver{
    constructor(private apollo: Apollo) {}

    public activities(input: ActivitiesInput): Observable<any>{
        return this.apollo.watchQuery<any>({
            variables: {input},
            query: gql`query activities($input: ActivitiesInput!){
                activities(input: $input){
                    total
                    hasMore
                    items{
                        ...ActivityFragment
                        pots{
                            id
                        }
                        participations{
                            amount
                        }
                    }
                }
            }
            ${ActivityFragment}`
        }).valueChanges;
    }

    public activity(id: string): Observable<any>{
        return this.apollo.watchQuery<any>({
            variables: {id},
            query: gql`query activity($id: String!){
                activity(id: $id){
                    ...ActivityFragment
                    pots{
                        id
                        title
                        description
                        activity{
                            id
                        }
                    }
                    participations{
                        id
                        amount
                        description
                        activity{
                            id
                        }
                        user{
                            id
                            username
                        }
                        pot{
                            id
                        }
                    }
                }
            }
            ${ActivityFragment}`
        }).valueChanges;
    }

    public addActivity(input: AddActivityInput): Observable<any>{
        return this.apollo.mutate<any>({
            variables: {input},
            mutation: gql`mutation addActivity($input: AddActivityInput!){
                addActivity(input: $input){
                    ...ActivityFragment
                }
            }
            ${ActivityFragment}`
        });
    }

    public updateActivity(id: string, input: UpdateActivityInput): Observable<any>{
        return this.apollo.mutate<any>({
            variables: {id, input},
            mutation: gql`mutation updateActivity($id: String!, $input: UpdateActivityInput!){
                updateActivity(id: $id, input: $input){
                    ...ActivityFragment
                    activityUserJunctions{
                        user{
                            id
                            username
                        }
                    }
                }
            }
            ${ActivityFragment}`
        });
    }

    public deleteActivity(id: string): Observable<any>{
        return this.apollo.mutate<any>({
            variables: {id},
            mutation: gql`mutation deleteActivity($id: String!){
                deleteActivity(id: $id)
            }`
        });
    }

}
