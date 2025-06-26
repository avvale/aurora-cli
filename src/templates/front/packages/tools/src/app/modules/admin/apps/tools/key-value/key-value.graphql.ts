import gql from 'graphql-tag';

export const fields = `
    key
    type
    value
    isActive
    description
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query ToolsPaginateKeyValues (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: toolsPaginateKeyValues (
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
    query ToolsGetKeyValues (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: toolsGetKeyValues (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query ToolsFindKeyValueById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: toolsFindKeyValueById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query ToolsFindKeyValue (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: toolsFindKeyValue (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation ToolsCreateKeyValue (
        $payload: ToolsCreateKeyValueInput!
    ) {
        toolsCreateKeyValue (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation ToolsCreateKeyValues (
        $payload: [ToolsCreateKeyValueInput]!
    ) {
        toolsCreateKeyValues (
            payload: $payload
        )
    }
`;

export const updateByIdMutation = gql`
    mutation ToolsUpdateKeyValueById (
        $payload: ToolsUpdateKeyValueByIdInput!
        $constraint: QueryStatement
    ) {
        toolsUpdateKeyValueById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation ToolsUpdateKeyValues (
        $payload: ToolsUpdateKeyValuesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        toolsUpdateKeyValues (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation ToolsDeleteKeyValueById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        toolsDeleteKeyValueById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation ToolsDeleteKeyValues (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        toolsDeleteKeyValues (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
