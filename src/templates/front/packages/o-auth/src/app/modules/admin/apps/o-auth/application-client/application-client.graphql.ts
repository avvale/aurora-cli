import gql from 'graphql-tag';

export const fields = `
    application {
        id
        rowId
        code
        name
        secret
        isMaster
    }
    client {
        id
        rowId
        grantType
        name
        secret
        authUrl
        redirect
        scopeOptions
        expiredAccessToken
        expiredRefreshToken
        isActive
        isMaster
    }
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query OAuthPaginateApplicationsClients(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: oAuthPaginateApplicationsClients(
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
    query OAuthGetApplicationsClients(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: oAuthGetApplicationsClients(
            query: $query
            constraint: $constraint
        ) {
            applicationId
            clientId
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query OAuthFindApplicationClientById(
        $applicationId: ID
        $clientId: ID
        $constraint: QueryStatement
    ) {
        object: oAuthFindApplicationClientById(
            applicationId: $applicationId
            clientId: $clientId
            constraint: $constraint
        ) {
            applicationId
            clientId
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query OAuthFindApplicationClient(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: oAuthFindApplicationClient(
            query: $query
            constraint: $constraint
        ) {
            applicationId
            clientId
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation OAuthCreateApplicationClient (
        $payload: OAuthCreateApplicationClientInput!
    ) {
        oAuthCreateApplicationClient (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation OAuthCreateApplicationsClients(
        $payload: [OAuthCreateApplicationClientInput]!
    ) {
        oAuthCreateApplicationsClients(payload: $payload)
    }
`;

export const updateByIdMutation = gql`
    mutation OAuthUpdateApplicationClientById (
        $payload: OAuthUpdateApplicationClientByIdInput!
        $constraint: QueryStatement
    ) {
        oAuthUpdateApplicationClientById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation OAuthUpdateApplicationsClients (
        $payload: OAuthUpdateApplicationsClientsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        oAuthUpdateApplicationsClients (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation OAuthDeleteApplicationClientById (
        $applicationId: ID!
        $clientId: ID!
        $constraint: QueryStatement
    ) {
        oAuthDeleteApplicationClientById (
            applicationId: $applicationId
            clientId: $clientId
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation OAuthDeleteApplicationsClients (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        oAuthDeleteApplicationsClients (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
