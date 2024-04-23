import gql from 'graphql-tag';

export const fields = `
    type
    code
    email
    username
    isActive
    clientId
    client {
        id
        grantType
        scopeOptions
    }
    tags
    scopes
    dApplicationCodes
    dPermissions
    dTenants
    meta
    roles {
        id
        name
    }
    tenants {
        id
        name
    }
    user {
        id
        name
        surname
        mobile
        langId
    }
    createdAt
    updatedAt
`;

export const relationsFields = `
    iamGetTenants {
        id
        name
    }
    iamGetRoles {
        id
        name
    }
    iamGetTags {
        id
        name
    }
    oAuthGetClients (
        query: $queryGetClients
        constraint: $constraintGetClients
    ) {
        id
        name
        grantType
        scopeOptions
    }
`;

// default methods
export const paginationQuery = gql`
    query IamPaginateAccounts (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: iamPaginateAccounts (
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
    query IamGetAccounts (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: iamGetAccounts (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const getRelations = gql`
    query IamGetAccountsRelations (
        $queryGetClients: QueryStatement
        $constraintGetClients: QueryStatement
    ) {
        ${relationsFields}
    }
`;

export const findByIdQuery = gql`
    query IamFindAccountById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: iamFindAccountById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdWithRelationsQuery = gql`
    query IamFindAccountByIdWithRelations (
        $id: ID
        $constraint: QueryStatement
        $queryGetClients: QueryStatement
        $constraintGetClients: QueryStatement
    ) {
        object: iamFindAccountById (
            id: $id
            constraint: $constraint
            queryGetClients: $queryGetClients
            constraintGetClients: $constraintGetClients
        ) {
            id
            #FIELDS
        }
        ${relationsFields}
    }
`;

export const findQuery = gql`
    query IamFindAccount (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: iamFindAccount (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation IamCreateAccount (
        $payload: IamCreateAccountInput!
    ) {
        iamCreateAccount (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation IamUpdateAccountById (
        $payload: IamUpdateAccountByIdInput!
        $constraint: QueryStatement
    ) {
        iamUpdateAccountById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation IamUpdateAccounts (
        $payload: IamUpdateAccountsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        iamUpdateAccounts (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation IamDeleteAccountById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        iamDeleteAccountById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation IamDeleteAccounts (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        iamDeleteAccounts (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
