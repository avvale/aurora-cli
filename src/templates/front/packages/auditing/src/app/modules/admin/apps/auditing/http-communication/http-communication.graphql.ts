import gql from 'graphql-tag';

export const fields = `
    code
    event
    status
    method
    url
    httpRequest
    httpRequestRejected
    httpResponse
    httpResponseRejected
    createdAt
    updatedAt
`;

export const relationsFields = '';

// default methods
export const paginationQuery = gql`
    query AuditingPaginateHttpCommunications (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: auditingPaginateHttpCommunications (
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
    query AuditingGetHttpCommunications (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: auditingGetHttpCommunications (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query AuditingFindHttpCommunicationById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: auditingFindHttpCommunicationById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query AuditingFindHttpCommunication (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: auditingFindHttpCommunication (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation AuditingCreateHttpCommunication (
        $payload: AuditingCreateHttpCommunicationInput!
    ) {
        auditingCreateHttpCommunication (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation AuditingUpdateHttpCommunicationById (
        $payload: AuditingUpdateHttpCommunicationByIdInput!
        $constraint: QueryStatement
    ) {
        auditingUpdateHttpCommunicationById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation AuditingUpdateHttpCommunications (
        $payload: AuditingUpdateHttpCommunicationsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        auditingUpdateHttpCommunications (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation AuditingDeleteHttpCommunicationById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        auditingDeleteHttpCommunicationById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation AuditingDeleteHttpCommunications (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        auditingDeleteHttpCommunications (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
