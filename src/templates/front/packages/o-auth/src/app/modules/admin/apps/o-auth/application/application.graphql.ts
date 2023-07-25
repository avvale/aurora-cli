import gql from 'graphql-tag';

export const fields = `
    code
    name
    secret
    isMaster
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query OAuthPaginateApplications (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: oAuthPaginateApplications (
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
    query OAuthGetApplications (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: oAuthGetApplications (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query OAuthFindApplicationById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: oAuthFindApplicationById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query OAuthFindApplication (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: oAuthFindApplication (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation OAuthCreateApplication (
        $payload: OAuthCreateApplicationInput!
    ) {
        oAuthCreateApplication (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation OAuthUpdateApplicationById (
        $payload: OAuthUpdateApplicationByIdInput!
        $constraint: QueryStatement
    ) {
        oAuthUpdateApplicationById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation OAuthUpdateApplications (
        $payload: OAuthUpdateApplicationsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        oAuthUpdateApplications (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation OAuthDeleteApplicationById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        oAuthDeleteApplicationById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation OAuthDeleteApplications (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        oAuthDeleteApplications (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
