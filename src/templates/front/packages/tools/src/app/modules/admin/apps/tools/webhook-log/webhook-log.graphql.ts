import gql from 'graphql-tag';

export const fields = `
    rowId
    url
    headerRequest
    bodyRequest
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query ToolsPaginateWebhookLogs(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: toolsPaginateWebhookLogs(
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
    query ToolsGetWebhookLogs(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: toolsGetWebhookLogs(query: $query, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query ToolsFindWebhookLogById($id: ID, $constraint: QueryStatement) {
        object: toolsFindWebhookLogById(id: $id, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query ToolsFindWebhookLog(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: toolsFindWebhookLog(query: $query, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation ToolsCreateWebhookLog (
        $payload: ToolsCreateWebhookLogInput!
    ) {
        toolsCreateWebhookLog (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation ToolsCreateWebhookLogs($payload: [ToolsCreateWebhookLogInput]!) {
        toolsCreateWebhookLogs(payload: $payload)
    }
`;

export const updateByIdMutation = gql`
    mutation ToolsUpdateWebhookLogById (
        $payload: ToolsUpdateWebhookLogByIdInput!
        $constraint: QueryStatement
    ) {
        toolsUpdateWebhookLogById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation ToolsUpdateWebhookLogs (
        $payload: ToolsUpdateWebhookLogsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        toolsUpdateWebhookLogs (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation ToolsDeleteWebhookLogById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        toolsDeleteWebhookLogById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation ToolsDeleteWebhookLogs (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        toolsDeleteWebhookLogs (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
