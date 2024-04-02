import gql from 'graphql-tag';

export const fields = `
    name
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query IamPaginateTags (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: iamPaginateTags (
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
    query IamGetTags (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: iamGetTags (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query IamFindTagById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: iamFindTagById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query IamFindTag (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: iamFindTag (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation IamCreateTag (
        $payload: IamCreateTagInput!
    ) {
        iamCreateTag (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation IamUpdateTagById (
        $payload: IamUpdateTagByIdInput!
        $constraint: QueryStatement
    ) {
        iamUpdateTagById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation IamUpdateTags (
        $payload: IamUpdateTagsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        iamUpdateTags (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation IamDeleteTagById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        iamDeleteTagById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation IamDeleteTags (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        iamDeleteTags (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
