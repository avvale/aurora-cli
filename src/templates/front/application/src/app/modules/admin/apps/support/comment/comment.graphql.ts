import gql from 'graphql-tag';

export const fields = `
    rowId
    externalId
    issueId
    accountId
    accountUsername
    displayName
    description
    attachments
    screenRecording
    meta
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query SupportPaginateComments(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: supportPaginateComments(
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
    query SupportGetComments(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: supportGetComments(query: $query, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query SupportFindCommentById($id: ID, $constraint: QueryStatement) {
        object: supportFindCommentById(id: $id, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query SupportFindComment(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: supportFindComment(query: $query, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation SupportCreateComment (
        $payload: SupportCreateCommentInput!
    ) {
        supportCreateComment (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation SupportCreateComments($payload: [SupportCreateCommentInput]!) {
        supportCreateComments(payload: $payload)
    }
`;

export const updateByIdMutation = gql`
    mutation SupportUpdateCommentById (
        $payload: SupportUpdateCommentByIdInput!
        $constraint: QueryStatement
    ) {
        supportUpdateCommentById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation SupportUpdateComments (
        $payload: SupportUpdateCommentsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        supportUpdateComments (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation SupportDeleteCommentById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        supportDeleteCommentById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation SupportDeleteComments (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        supportDeleteComments (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
