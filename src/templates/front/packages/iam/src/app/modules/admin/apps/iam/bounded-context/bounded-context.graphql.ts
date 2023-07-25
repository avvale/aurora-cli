import gql from 'graphql-tag';

export const fields = `
    name
    root
    sort
    isActive
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query IamPaginateBoundedContexts (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: iamPaginateBoundedContexts (
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
    query IamGetBoundedContexts (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: iamGetBoundedContexts (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query IamFindBoundedContextById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: iamFindBoundedContextById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdWithRelationsQuery = gql`
    query IamFindBoundedContextByIdWithRelations (
        $id: ID
        $constraint: QueryStatement
        $queryPaginatePermissions: QueryStatement
        $constraintPaginatePermissions: QueryStatement
    ) {
        object: iamFindBoundedContextById (
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
        ${relationsFields}
    }
`;

export const findQuery = gql`
    query IamFindBoundedContext (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: iamFindBoundedContext (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation IamCreateBoundedContext (
        $payload: IamCreateBoundedContextInput!
    ) {
        iamCreateBoundedContext (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation IamUpdateBoundedContextById (
        $payload: IamUpdateBoundedContextByIdInput!
        $constraint: QueryStatement
    ) {
        iamUpdateBoundedContextById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation IamUpdateBoundedContexts (
        $payload: IamUpdateBoundedContextsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        iamUpdateBoundedContexts (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation IamDeleteBoundedContextById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        iamDeleteBoundedContextById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation IamDeleteBoundedContexts (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        iamDeleteBoundedContexts (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
