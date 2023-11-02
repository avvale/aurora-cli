import gql from 'graphql-tag';

export const fields = `
    name
    boundedContextId
    roles {
        id
    }
    createdAt
    updatedAt
`;

export const relationsFields = `
    iamGetBoundedContexts (
        query: $queryBoundedContexts
        constraint: $constraintBoundedContexts
    ) {
        id
        name
        root
        sort
        isActive
    }
`;

// default methods
export const paginationQuery = gql`
    query IamPaginatePermissions (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: iamPaginatePermissions (
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
    query IamGetPermissions (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: iamGetPermissions (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const getRelations = gql`
    query IamGetPermissionsRelations(
        $queryBoundedContexts: QueryStatement
        $constraintBoundedContexts: QueryStatement
    ) {
        ${relationsFields}
    }
`;

export const findByIdQuery = gql`
    query IamFindPermissionById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: iamFindPermissionById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdWithRelationsQuery = gql`
    query IamFindPermissionByIdWithRelations (
        $id: ID
        $constraint: QueryStatement
        $queryBoundedContexts: QueryStatement
        $constraintBoundedContexts: QueryStatement
    ) {
        object: iamFindPermissionById (
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
    query IamFindPermission (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: iamFindPermission (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation IamCreatePermission (
        $payload: IamCreatePermissionInput!
    ) {
        iamCreatePermission (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation IamUpdatePermissionById (
        $payload: IamUpdatePermissionByIdInput!
        $constraint: QueryStatement
    ) {
        iamUpdatePermissionById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation IamUpdatePermissions (
        $payload: IamUpdatePermissionsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        iamUpdatePermissions (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation IamDeletePermissionById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        iamDeletePermissionById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation IamDeletePermissions (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        iamDeletePermissions (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
