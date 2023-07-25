import gql from 'graphql-tag';

export const fields = `
    clientId
    accountId
    token
    name
    isRevoked
    expiresAt
    refreshToken {
        id
    }
    createdAt
    updatedAt
`;

export const relationsFields = '';

// default methods
export const paginationQuery = gql`
    query OAuthPaginateAccessTokens (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: oAuthPaginateAccessTokens (
            query: $query
            constraint: $constraint
        ) {
            total
            rows
            count
        }
    }
`;

export const getQuery = gql`
    query OAuthGetAccessTokens (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: oAuthGetAccessTokens (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query OAuthFindAccessTokenById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: oAuthFindAccessTokenById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query OAuthFindAccessToken (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: oAuthFindAccessToken (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation OAuthCreateAccessToken (
        $payload: OAuthCreateAccessTokenInput!
    ) {
        oAuthCreateAccessToken (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation OAuthUpdateAccessTokenById (
        $payload: OAuthUpdateAccessTokenByIdInput!
        $constraint: QueryStatement
    ) {
        oAuthUpdateAccessTokenById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation OAuthUpdateAccessTokens (
        $payload: OAuthUpdateAccessTokensInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        oAuthUpdateAccessTokens (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation OAuthDeleteAccessTokenById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        oAuthDeleteAccessTokenById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation OAuthDeleteAccessTokens (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        oAuthDeleteAccessTokens (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
