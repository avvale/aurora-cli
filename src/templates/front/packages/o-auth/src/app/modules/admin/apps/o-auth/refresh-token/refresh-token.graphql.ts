import gql from 'graphql-tag';

export const fields = `
    rowId
    accessTokenId
    token
    isRevoked
    expiresAt
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query OAuthPaginateRefreshTokens(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: oAuthPaginateRefreshTokens(
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
    query OAuthGetRefreshTokens(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: oAuthGetRefreshTokens(query: $query, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query OAuthFindRefreshTokenById($id: ID, $constraint: QueryStatement) {
        object: oAuthFindRefreshTokenById(id: $id, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query OAuthFindRefreshToken(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: oAuthFindRefreshToken(query: $query, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation OAuthCreateRefreshToken (
        $payload: OAuthCreateRefreshTokenInput!
    ) {
        oAuthCreateRefreshToken (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation OAuthCreateRefreshTokens(
        $payload: [OAuthCreateRefreshTokenInput]!
    ) {
        oAuthCreateRefreshTokens(payload: $payload)
    }
`;

export const updateByIdMutation = gql`
    mutation OAuthUpdateRefreshTokenById (
        $payload: OAuthUpdateRefreshTokenByIdInput!
        $constraint: QueryStatement
    ) {
        oAuthUpdateRefreshTokenById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation OAuthUpdateRefreshTokens (
        $payload: OAuthUpdateRefreshTokensInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        oAuthUpdateRefreshTokens (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation OAuthDeleteRefreshTokenById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        oAuthDeleteRefreshTokenById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation OAuthDeleteRefreshTokens (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        oAuthDeleteRefreshTokens (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
