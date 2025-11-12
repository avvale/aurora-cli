import gql from 'graphql-tag';

export const fields = `
    rowId
    externalId
    externalStatus
    accountId
    account {
        id
        rowId
        type
        code
        email
        username
        isActive
        tags
        scopes
        dApplicationCodes
        dPermissions
        dTenants
        meta
    }
    accountUsername
    frontVersion
    backVersion
    environment
    subject
    description
    attachments
    video
    meta
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query SupportPaginateIssues(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: supportPaginateIssues(
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
    query SupportGetIssues(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: supportGetIssues(query: $query, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query SupportFindIssueById($id: ID, $constraint: QueryStatement) {
        object: supportFindIssueById(id: $id, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query SupportFindIssue(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: supportFindIssue(query: $query, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation SupportCreateIssue (
        $payload: SupportCreateIssueInput!
    ) {
        supportCreateIssue (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation SupportCreateIssues($payload: [SupportCreateIssueInput]!) {
        supportCreateIssues(payload: $payload)
    }
`;

export const updateByIdMutation = gql`
    mutation SupportUpdateIssueById (
        $payload: SupportUpdateIssueByIdInput!
        $constraint: QueryStatement
    ) {
        supportUpdateIssueById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation SupportUpdateIssues (
        $payload: SupportUpdateIssuesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        supportUpdateIssues (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation SupportDeleteIssueById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        supportDeleteIssueById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation SupportDeleteIssues (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        supportDeleteIssues (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
