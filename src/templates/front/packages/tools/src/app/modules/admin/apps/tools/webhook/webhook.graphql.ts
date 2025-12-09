import gql from 'graphql-tag';

export const fields = `
    rowId
    name
    service
    endpoint
    externalId
    events
    secret
    meta
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query ToolsPaginateWebhooks(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: toolsPaginateWebhooks(
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
    query ToolsGetWebhooks(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: toolsGetWebhooks(query: $query, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query ToolsFindWebhookById($id: ID, $constraint: QueryStatement) {
        object: toolsFindWebhookById(id: $id, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query ToolsFindWebhook(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: toolsFindWebhook(query: $query, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation ToolsCreateWebhook (
        $payload: ToolsCreateWebhookInput!
    ) {
        toolsCreateWebhook (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation ToolsCreateWebhooks($payload: [ToolsCreateWebhookInput]!) {
        toolsCreateWebhooks(payload: $payload)
    }
`;

export const updateByIdMutation = gql`
    mutation ToolsUpdateWebhookById (
        $payload: ToolsUpdateWebhookByIdInput!
        $constraint: QueryStatement
    ) {
        toolsUpdateWebhookById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation ToolsUpdateWebhooks (
        $payload: ToolsUpdateWebhooksInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        toolsUpdateWebhooks (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation ToolsDeleteWebhookById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        toolsDeleteWebhookById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation ToolsDeleteWebhooks (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        toolsDeleteWebhooks (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

// Mutation additionalApis
export const digestWebhookMutation = gql`
    mutation ToolsDigestWebhook(
        $payload: ToolsUpdateWebhookByIdInput!
        $constraint: QueryStatement
    ) {
        toolsDigestWebhook(payload: $payload, constraint: $constraint)
    }
`;
