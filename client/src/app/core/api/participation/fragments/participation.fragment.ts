import gql from 'graphql-tag';

export const ParticipationFragment = gql`
    fragment ParticipationFragment on Participation{
        id
        amount
        description
        user{
            id
            username
        }
        activity{
            id
        }
        pot{
            id
        }
    }`;
