import gql from 'graphql-tag';

export const fields = `
    code
    name
    createdAt
    updatedAt
`;

export const relationsFields = '';

// default methods
export const paginationQuery = gql`
    query OAuthPaginateScopes (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: oAuthPaginateScopes (
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
    query OAuthGetScopes (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: oAuthGetScopes (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query OAuthFindScopeById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: oAuthFindScopeById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query OAuthFindScope (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: oAuthFindScope (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation OAuthCreateScope (
        $payload: OAuthCreateScopeInput!
    ) {
        oAuthCreateScope (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation OAuthUpdateScopeById (
        $payload: OAuthUpdateScopeByIdInput!
        $constraint: QueryStatement
    ) {
        oAuthUpdateScopeById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation OAuthUpdateScopes (
        $payload: OAuthUpdateScopesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        oAuthUpdateScopes (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation OAuthDeleteScopeById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        oAuthDeleteScopeById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation OAuthDeleteScopes (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        oAuthDeleteScopes (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
