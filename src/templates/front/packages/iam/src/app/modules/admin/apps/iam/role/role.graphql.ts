import gql from 'graphql-tag';

export const fields = `
    name
    isMaster
    permissions {
        id
    }
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query IamPaginateRoles (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: iamPaginateRoles (
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
    query IamGetRoles (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: iamGetRoles (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query IamFindRoleById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: iamFindRoleById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query IamFindRole (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: iamFindRole (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation IamCreateRole (
        $payload: IamCreateRoleInput!
    ) {
        iamCreateRole (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation IamUpdateRoleById (
        $payload: IamUpdateRoleByIdInput!
        $constraint: QueryStatement
    ) {
        iamUpdateRoleById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation IamUpdateRoles (
        $payload: IamUpdateRolesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        iamUpdateRoles (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation IamDeleteRoleById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        iamDeleteRoleById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation IamDeleteRoles (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        iamDeleteRoles (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

// ---- customizations ----
export const findByIdWithRelationsQuery = gql`
    query IamFindRoleById (
        $id: ID
        $constraint: QueryStatement
        $queryPaginatePermissionsRoles: QueryStatement
        $constraintPaginatePermissionsRoles: QueryStatement
        $queryPaginatePermissions: QueryStatement
        $constraintPaginatePermissions: QueryStatement
        $queryGetPermissionsRoles: QueryStatement
        $constraintGetPermissionsRoles: QueryStatement
    ) {
        object: iamFindRoleById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
        iamPaginatePermissionsRoles (
            query: $queryPaginatePermissionsRoles
            constraint: $constraintPaginatePermissionsRoles
        ) {
            total
            rows
            count
        }
        iamPaginatePermissions (
            query: $queryPaginatePermissions
            constraint: $constraintPaginatePermissions
        ) {
            total
            rows
            count
        }
        iamGetPermissionsRoles (
            query: $queryGetPermissionsRoles
            constraint: $constraintGetPermissionsRoles
        ) {
            permissionId
        }
    }
`;
