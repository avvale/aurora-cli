import gql from 'graphql-tag';

export const fields = `
    tenantIds
    messageId
    messageRowId
    accountId
    accountCode
    isImportant
    sentAt
    subject
    body
    link
    isInternalLink
    image
    icon
    attachments
    isRead
    isReadAtLeastOnce
    meta
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query MessagePaginateInboxes(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: messagePaginateInboxes(
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
    query MessageGetInboxes(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: messageGetInboxes(query: $query, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query MessageFindInboxById($id: ID, $constraint: QueryStatement) {
        object: messageFindInboxById(id: $id, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query MessageFindInbox(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: messageFindInbox(query: $query, constraint: $constraint) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation MessageCreateInbox (
        $payload: MessageCreateInboxInput!
    ) {
        messageCreateInbox (
            payload: $payload
        ) {
            id
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation MessageCreateInboxes($payload: [MessageCreateInboxInput]!) {
        messageCreateInboxes(payload: $payload)
    }
`;

export const updateByIdMutation = gql`
    mutation MessageUpdateInboxById (
        $payload: MessageUpdateInboxByIdInput!
        $constraint: QueryStatement
    ) {
        messageUpdateInboxById (
            payload: $payload
            constraint: $constraint
        ) {
            id
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation MessageUpdateInboxes (
        $payload: MessageUpdateInboxesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        messageUpdateInboxes (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            id
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation MessageDeleteInboxById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        messageDeleteInboxById (
            id: $id
            constraint: $constraint
        ) {
            id
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation MessageDeleteInboxes (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        messageDeleteInboxes (
            query: $query
            constraint: $constraint
        ) {
            id
            ${fields}
        }
    }
`;

// Queries additionalApis
export const paginateCustomerMessagesInboxQuery = gql`
    query MessagePaginateCustomerMessagesInbox(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: messagePaginateCustomerMessagesInbox(
            query: $query
            constraint: $constraint
        ) {
            total
            rows
            count
        }
    }
`;

export const findCustomerMessageInboxQuery = gql`
    query MessageFindCustomerMessageInbox (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: messageFindCustomerMessageInbox (
            query: $query
            constraint: $constraint
        ) {
            id
            ${fields}
        }
    }
`;

export const countUnreadCustomerMessageInboxQuery = gql`
    query MessageCountUnreadCustomerMessageInbox(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        messageCountUnreadCustomerMessageInbox(
            query: $query
            constraint: $constraint
        )
    }
`;

// Mutation additionalApis
export const checkMessagesInboxMutation = gql`
    mutation MessageCheckMessagesInbox {
        messageCheckMessagesInbox
    }
`;

export const deleteCustomerMessageInboxMutation = gql`
    mutation MessageDeleteCustomerMessageInbox (
        $id: ID!
        $constraint: QueryStatement
    ) {
        messageDeleteCustomerMessageInbox (
            id: $id
            constraint: $constraint
        )
        {
            id
            ${fields}
        }
    }
`;

export const readCustomerMessageInboxMutation = gql`
    mutation MessageReadCustomerMessageInbox(
        $inbox: MessageUpdateInboxByIdInput!
        $constraint: QueryStatement
    ) {
        messageReadCustomerMessageInbox(inbox: $inbox, constraint: $constraint)
    }
`;

export const unreadCustomerMessageInboxMutation = gql`
    mutation MessageUnreadCustomerMessageInbox(
        $inbox: MessageUpdateInboxByIdInput!
        $constraint: QueryStatement
    ) {
        messageUnreadCustomerMessageInbox(
            inbox: $inbox
            constraint: $constraint
        )
    }
`;
