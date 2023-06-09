import gql from 'graphql-tag';

export const CurrentUserFragment = gql`
    fragment CurrentUserFragment on User{
        id
        username
        email
        roles
        createdAt
        updatedAt
    }`;
