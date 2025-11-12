import gql from 'graphql-tag';

export const fields = `
    role {
        id
        rowId
        name
        isMaster
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
    query IamPaginateRolesAccounts(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: iamPaginateRolesAccounts(
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
    query IamGetRolesAccounts(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: iamGetRolesAccounts(query: $query, constraint: $constraint) {
            roleId
            accountId
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query IamFindRoleAccountById(
        $roleId: ID
        $accountId: ID
        $constraint: QueryStatement
    ) {
        object: iamFindRoleAccountById(
            roleId: $roleId
            accountId: $accountId
            constraint: $constraint
        ) {
            roleId
            accountId
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query IamFindRoleAccount(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: iamFindRoleAccount(query: $query, constraint: $constraint) {
            roleId
            accountId
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation IamCreateRoleAccount (
        $payload: IamCreateRoleAccountInput!
    ) {
        iamCreateRoleAccount (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation IamCreateRolesAccounts($payload: [IamCreateRoleAccountInput]!) {
        iamCreateRolesAccounts(payload: $payload)
    }
`;

export const updateByIdMutation = gql`
    mutation IamUpdateRoleAccountById (
        $payload: IamUpdateRoleAccountByIdInput!
        $constraint: QueryStatement
    ) {
        iamUpdateRoleAccountById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation IamUpdateRolesAccounts (
        $payload: IamUpdateRolesAccountsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        iamUpdateRolesAccounts (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation IamDeleteRoleAccountById (
        $roleId: ID!
        $accountId: ID!
        $constraint: QueryStatement
    ) {
        iamDeleteRoleAccountById (
            roleId: $roleId
            accountId: $accountId
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation IamDeleteRolesAccounts (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        iamDeleteRolesAccounts (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
