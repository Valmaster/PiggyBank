import gql from 'graphql-tag';

export const PotFragment = gql`
    fragment PotFragment on Pot{
        id
        title
        description
        createdAt
        updatedAt
        participations{
            id
            amount
            description
            user{
                id
                username
            }
        }
        activity{
            id
        }
    }`;
