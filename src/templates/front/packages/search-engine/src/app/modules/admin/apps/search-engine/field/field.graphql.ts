import gql from 'graphql-tag';

export const fields = `
    collectionId
    name
    type
    isNullable
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query SearchEnginePaginateFields (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: searchEnginePaginateFields (
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
    query SearchEngineGetFields (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: searchEngineGetFields (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query SearchEngineFindFieldById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: searchEngineFindFieldById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query SearchEngineFindField (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: searchEngineFindField (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation SearchEngineCreateField (
        $payload: SearchEngineCreateFieldInput!
    ) {
        searchEngineCreateField (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation SearchEngineUpdateFieldById (
        $payload: SearchEngineUpdateFieldByIdInput!
        $constraint: QueryStatement
    ) {
        searchEngineUpdateFieldById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation SearchEngineUpdateFields (
        $payload: SearchEngineUpdateFieldsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        searchEngineUpdateFields (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation SearchEngineDeleteFieldById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        searchEngineDeleteFieldById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation SearchEngineDeleteFields (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        searchEngineDeleteFields (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
