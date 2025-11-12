import gql from 'graphql-tag';

export const fields = `
    tenant {
        id
        rowId
        name
        code
        logo
        isActive
        meta
    }
    account {
        id
        rowId
        type
        code
        email
        username
        isActive
        tags
        scopes
        dApplicationCodes
        dPermissions
        dTenants
        meta
    }
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query IamPaginateTenantsAccounts(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: iamPaginateTenantsAccounts(
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
    query IamGetTenantsAccounts(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: iamGetTenantsAccounts(query: $query, constraint: $constraint) {
            tenantId
            accountId
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query IamFindTenantAccountById(
        $tenantId: ID
        $accountId: ID
        $constraint: QueryStatement
    ) {
        object: iamFindTenantAccountById(
            tenantId: $tenantId
            accountId: $accountId
            constraint: $constraint
        ) {
            tenantId
            accountId
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query IamFindTenantAccount(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: iamFindTenantAccount(query: $query, constraint: $constraint) {
            tenantId
            accountId
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation IamCreateTenantAccount (
        $payload: IamCreateTenantAccountInput!
    ) {
        iamCreateTenantAccount (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation IamCreateTenantsAccounts(
        $payload: [IamCreateTenantAccountInput]!
    ) {
        iamCreateTenantsAccounts(payload: $payload)
    }
`;

export const updateByIdMutation = gql`
    mutation IamUpdateTenantAccountById (
        $payload: IamUpdateTenantAccountByIdInput!
        $constraint: QueryStatement
    ) {
        iamUpdateTenantAccountById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation IamUpdateTenantsAccounts (
        $payload: IamUpdateTenantsAccountsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        iamUpdateTenantsAccounts (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation IamDeleteTenantAccountById (
        $tenantId: ID!
        $accountId: ID!
        $constraint: QueryStatement
    ) {
        iamDeleteTenantAccountById (
            tenantId: $tenantId
            accountId: $accountId
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation IamDeleteTenantsAccounts (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        iamDeleteTenantsAccounts (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
