import gql from 'graphql-tag';

export const fields = `
    rowId
    parentId
    parent {
        id
        rowId
        name
        code
    }
    name
    code
    logo
    isActive
    meta
    accounts {
        id
    }
    createdAt
    updatedAt
`;

export const relationsFields = `
    iamGetTenants (
        query: $queryTenants
        constraint: $constraintTenants
    ) {
        id
        rowId
        name
        code
        logo
        isActive
        meta
    }
`;

// default methods
export const paginationQuery = gql`
    query IamPaginateTenants(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: iamPaginateTenants(query: $query, constraint: $constraint) {
            total
            rows
            count
        }
    }
`;

export const getQuery = gql`
    query IamGetTenants($query: QueryStatement, $constraint: QueryStatement) {
        objects: iamGetTenants(query: $query, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const getRelations = gql`
    query IamGetTenantsRelations (
        $queryTenants: QueryStatement
        $constraintTenants: QueryStatement
    ) {
        ${relationsFields}
    }
`;

export const findByIdQuery = gql`
    query IamFindTenantById($id: ID, $constraint: QueryStatement) {
        object: iamFindTenantById(id: $id, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const findByIdWithRelationsQuery = gql`
    query IamFindTenantByIdWithRelations (
        $id: ID
        $constraint: QueryStatement
        $queryTenants: QueryStatement
        $constraintTenants: QueryStatement
    ) {
        object: iamFindTenantById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
        ${relationsFields}
    }
`;

export const findQuery = gql`
    query IamFindTenant($query: QueryStatement, $constraint: QueryStatement) {
        object: iamFindTenant(query: $query, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation IamCreateTenant (
        $payload: IamCreateTenantInput!
    ) {
        iamCreateTenant (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation IamCreateTenants($payload: [IamCreateTenantInput]!) {
        iamCreateTenants(payload: $payload)
    }
`;

export const updateByIdMutation = gql`
    mutation IamUpdateTenantById (
        $payload: IamUpdateTenantByIdInput!
        $constraint: QueryStatement
    ) {
        iamUpdateTenantById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation IamUpdateTenants (
        $payload: IamUpdateTenantsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        iamUpdateTenants (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation IamDeleteTenantById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        iamDeleteTenantById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation IamDeleteTenants (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        iamDeleteTenants (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

// Queries additionalApis
export const getWithTenantConstraintTenantsQuery = gql`
    query IamGetWithTenantConstraintTenants (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        iamGetWithTenantConstraintTenants (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const paginateWithTenantConstraintTenantsQuery = gql`
    query IamPaginateWithTenantConstraintTenants (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: iamPaginateWithTenantConstraintTenants (
            query: $query
            constraint: $constraint
        ) {
            total
            rows
            count
        }
    }
`;
