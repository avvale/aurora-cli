import gql from 'graphql-tag';

export const fields = `
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
    createdAt
    updatedAt
`;

export const relationsFields = `
    oAuthGetApplications {
        id
        code
        name
    }
    oAuthGetScopes {
        id
        code
        name
    }
`;

// default methods
export const paginationQuery = gql`
    query OAuthPaginateClients(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: oAuthPaginateClients(
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
    query OAuthGetClients($query: QueryStatement, $constraint: QueryStatement) {
        objects: oAuthGetClients(query: $query, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const getRelations = gql`
    query OAuthGetClientsRelations {
        ${relationsFields}
    }
`;

export const findByIdQuery = gql`
    query OAuthFindClientById($id: ID, $constraint: QueryStatement) {
        object: oAuthFindClientById(id: $id, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const findByIdWithRelationsQuery = gql`
    query OAuthFindClientByIdWithRelations (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: oAuthFindClientById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
            applications {
                id
                code
                name
            }
        }
        ${relationsFields}
    }
`;

export const findQuery = gql`
    query OAuthFindClient($query: QueryStatement, $constraint: QueryStatement) {
        object: oAuthFindClient(query: $query, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation OAuthCreateClient (
        $payload: OAuthCreateClientInput!
    ) {
        oAuthCreateClient (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation OAuthCreateClients($payload: [OAuthCreateClientInput]!) {
        oAuthCreateClients(payload: $payload)
    }
`;

export const updateByIdMutation = gql`
    mutation OAuthUpdateClientById (
        $payload: OAuthUpdateClientByIdInput!
        $constraint: QueryStatement
    ) {
        oAuthUpdateClientById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation OAuthUpdateClients (
        $payload: OAuthUpdateClientsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        oAuthUpdateClients (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation OAuthDeleteClientById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        oAuthDeleteClientById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation OAuthDeleteClients (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        oAuthDeleteClients (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
