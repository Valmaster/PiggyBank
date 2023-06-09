import {ApolloError} from 'apollo-client';

export function getErrorMessage(error: ApolloError): string {
    if (!error) {
        return;
    }
    return error.graphQLErrors && error.graphQLErrors[0]
        ? error.graphQLErrors[0].message as any
        : null;
}
