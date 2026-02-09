/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import gql from 'graphql-tag';

export const fields = `
    rowId
    code
    name
    isActive
    hasAttachments
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query CommonPaginateResources(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: commonPaginateResources(
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
    query CommonGetResources(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: commonGetResources(query: $query, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query CommonFindResourceById($id: ID, $constraint: QueryStatement) {
        object: commonFindResourceById(id: $id, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query CommonFindResource(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: commonFindResource(query: $query, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation CommonCreateResource (
        $payload: CommonCreateResourceInput!
    ) {
        commonCreateResource (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation CommonCreateResources($payload: [CommonCreateResourceInput]!) {
        commonCreateResources(payload: $payload)
    }
`;

export const updateByIdMutation = gql`
    mutation CommonUpdateResourceById (
        $payload: CommonUpdateResourceByIdInput!
        $constraint: QueryStatement
    ) {
        commonUpdateResourceById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation CommonUpdateResources (
        $payload: CommonUpdateResourcesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        commonUpdateResources (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation CommonDeleteResourceById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        commonDeleteResourceById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation CommonDeleteResources (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        commonDeleteResources (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
