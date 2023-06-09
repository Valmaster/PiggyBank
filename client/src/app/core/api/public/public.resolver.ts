import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {RefreshInput} from 'core/api/public/inputs/refresh.input';
import {Observable} from 'rxjs';
import {RegisterInput} from 'core/api/public/inputs/register.input';
import {LoginInput} from 'core/api/public/inputs/login.input';
import {EmailExistsInput} from 'core/api/public/inputs/email-exists.input';
import gql from 'graphql-tag';

@Injectable()
export class PublicResolver {

    constructor(private apollo: Apollo) {
    }

    public refresh(input: RefreshInput): Observable<any> {
        return this.apollo.mutate<any>({
            variables: {input},
            mutation: gql`mutation refresh($input: RefreshInput!){
                refresh(input: $input){
                    accessToken
                    refreshToken
                }
            }`
        });
    }

    public register(input: RegisterInput): Observable<any> {
        return this.apollo.mutate<any>({
            variables: {input},
            mutation: gql`mutation register($input: RegisterInput!){
                register(input: $input) {
                    refreshToken
                    accessToken
                    user{
                        id
                        username
                        email
                        roles
                        createdAt
                        updatedAt
                    }
                }
            }`
        });
    }

    public login(input: LoginInput): Observable<any> {
        return this.apollo.mutate<any>({
            variables: {input},
            mutation: gql`mutation login($input: LoginInput!){
                login(input: $input){
                    refreshToken
                    accessToken
                    user{
                        id
                        username
                        email
                        roles
                        createdAt
                        updatedAt
                    }
                }
            }`
        });
    }

    public emailExists(input: EmailExistsInput): Observable<any> {
        return this.apollo.watchQuery<any>({
            variables: {input},
            query: gql`query emailExists($input: EmailExistsInput!){
                emailExists(input: $input)
            }`
        }).valueChanges;
    }

    public invitationExists(invitationCode: string): Observable<any> {
        return this.apollo.watchQuery<any>({
            variables: {invitationCode},
            query: gql`query invitationExists($invitationCode: String!){
                invitationExists(invitationCode: $invitationCode){
                    id
                    activity{
                        id
                        title
                        user{
                            username
                        }
                    }
                    code
                }
            }`
        }).valueChanges;
    }

}



