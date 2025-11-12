import gql from 'graphql-tag';

export const fields = `
    permissionId
    roleId
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query IamPaginatePermissionsRoles(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: iamPaginatePermissionsRoles(
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
    query IamGetPermissionsRoles(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: iamGetPermissionsRoles(
            query: $query
            constraint: $constraint
        ) {
            permissionId
            roleId
        }
    }
`;

export const findByIdQuery = gql`
    query IamFindPermissionRoleById(
        $permissionId: ID
        $roleId: ID
        $constraint: QueryStatement
    ) {
        object: iamFindPermissionRoleById(
            permissionId: $permissionId
            roleId: $roleId
            constraint: $constraint
        ) {
            permissionId
            roleId
            #FIELDS
        }
        ${relationsFields}
    }
`;

export const findQuery = gql`
    query IamFindPermissionRole(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: iamFindPermissionRole(query: $query, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation IamCreatePermissionRole (
        $payload: IamCreatePermissionRoleInput!
    ) {
        iamCreatePermissionRole (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation IamCreatePermissionsRoles(
        $payload: [IamCreatePermissionRoleInput]!
    ) {
        iamCreatePermissionsRoles(payload: $payload)
    }
`;

export const updateByIdMutation = gql`
    mutation IamUpdatePermissionRoleById (
        $payload: IamUpdatePermissionRoleByIdInput!
        $constraint: QueryStatement
    ) {
        iamUpdatePermissionRoleById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation IamUpdatePermissionsRoles (
        $payload: IamUpdatePermissionsRolesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        iamUpdatePermissionsRoles (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation IamDeletePermissionRoleById (
        $permissionId: ID!
        $roleId: ID!
        $constraint: QueryStatement
    ) {
        iamDeletePermissionRoleById (
            permissionId: $permissionId
            roleId: $roleId
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation IamDeletePermissionsRoles (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        iamDeletePermissionsRoles (
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
        $queryPaginatePermissions: QueryStatement
        $constraintPaginatePermissions: QueryStatement
    ) {
        object: iamFindRoleById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
        iamPaginatePermissions (
            query: $queryPaginatePermissions
            constraint: $constraintPaginatePermissions
        ) {
            total
            rows
            count
        }
    }
`;

export const getQueryExportPermissionsRoles = gql`
    query IamExportPermissionsRoles (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: iamGetPermissionsRoles (
            query: $query
            constraint: $constraint
        ) {
            permissionId
            permission {
                id
                name
            }
            roleId
        }
    }
`;
