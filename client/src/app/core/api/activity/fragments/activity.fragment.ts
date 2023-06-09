import gql from 'graphql-tag';

export const ActivityFragment = gql`
    fragment ActivityFragment on Activity{
        id
        title
        description
        state
        createdAt
        updatedAt
        user{
            id
            username
        }
        pots{
            id
        }
        activityUserJunctions{
            id
            activity{
                id
            }
            user{
                id
                username
            }
        }
    }`;
