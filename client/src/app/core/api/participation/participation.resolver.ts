import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {ParticipationFragment} from 'core/api/participation/fragments/participation.fragment';
import gql from 'graphql-tag';
import {AddPotInput} from 'core/api/pot/inputs/add-pot.input';
import {AddParticipationInput} from 'core/api/participation/inputs/add-participation.input';
import {UpdateParticipationInput} from 'core/api/participation/inputs/update-participation.input';

@Injectable()
export class ParticipationResolver {
    constructor(private apollo: Apollo) {
    }

    public addParticipation(potId: string, input: AddParticipationInput): Observable<any> {
        return this.apollo.mutate<any>({
            variables: {potId, input},
            mutation: gql`mutation addParticipation($potId: String!, $input: AddParticipationInput!){
                addParticipation(potId: $potId, input: $input){
                    ...ParticipationFragment
                }
            }
            ${ParticipationFragment}`
        });
    }

    public updateParticipation(id: string, input: UpdateParticipationInput): Observable<any> {
        return this.apollo.mutate<any>({
            variables: {id, input},
            mutation: gql`mutation updateParticipation($id: String!, $input: UpdateParticipationInput!){
                updateParticipation(id: $id, input: $input){
                    ...ParticipationFragment
                }
            }
            ${ParticipationFragment}`
        });
    }

    public deleteParticipation(id: string): Observable<any>{
        return this.apollo.mutate<any>({
            variables: {id},
            mutation: gql`mutation deleteParticipation($id: String!){
                deleteParticipation(id: $id)
            }`
        });
    }
}
