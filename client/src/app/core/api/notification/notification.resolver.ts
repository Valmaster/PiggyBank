import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import gql from 'graphql-tag';
import {NotificationsInput} from 'core/api/notification/inputs/notifications.input';

@Injectable()
export class NotificationResolver {
    constructor(
        private apollo: Apollo,
    ) {
    }

    receivedNotification(): Observable<any> {
        return this.apollo.subscribe<any>({
            query: gql`subscription {
                receivedNotification{
                    id
                    type
                    message
                    relatedId
                }
            }`
        });
    }

    notifications(input: NotificationsInput): Observable<any> {
        return this.apollo.watchQuery<any>({
            variables: {input},
            query: gql`query notifications($input: NotificationsInput!){
                notifications(input: $input){
                    total
                    hasMore
                    items{
                        id
                        type
                        message
                        relatedId
                        readAt
                    }
                }
            }`
        }).valueChanges;
    }

    readNotification(id: string): Observable<any> {
        return this.apollo.mutate<any>({
            variables: {id},
            mutation: gql`mutation readNotification($id: String!){
                readNotification(id: $id){
                    id
                    type
                    message
                    relatedId
                }
            }`
        });
    }
}
