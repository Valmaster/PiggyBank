import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {AddPotInput} from 'core/api/pot/inputs/add-pot.input';
import {UpdatePotInput} from 'core/api/pot/inputs/update-pot.input';
import gql from 'graphql-tag';
import {PotFragment} from 'core/api/pot/fragments/pot.fragment';
import {AddParticipationInput} from 'core/api/participation/inputs/add-participation.input';
import {ParticipationFragment} from 'core/api/participation/fragments/participation.fragment';
import {UpdateParticipationInput} from 'core/api/participation/inputs/update-participation.input';

@Injectable()
export class PotResolver{
    constructor(private apollo: Apollo) {}

    public addPot(activityId: string, input: AddPotInput): Observable<any>{
        return this.apollo.mutate<any>({
            variables: {activityId, input},
            mutation: gql`mutation addPot($activityId: String!, $input: AddPotInput!){
                addPot(activityId: $activityId, input: $input){
                    ...PotFragment
                }
            }
            ${PotFragment}`
        });
    }

    public updatePot(id: string, input: UpdatePotInput): Observable<any>{
        return this.apollo.mutate<any>({
            variables: {id, input},
            mutation: gql`mutation updatePot($id: String!, $input: UpdatePotInput!){
                updatePot(id: $id, input: $input){
                    ...PotFragment
                }
            }
            ${PotFragment}`
        });
    }

    public deletePot(id: string): Observable<any>{
        return this.apollo.mutate<any>({
            variables: {id},
            mutation: gql`mutation deletePot($id: String!){
                deletePot(id: $id)
            }`
        });
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
