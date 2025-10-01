import gql from 'graphql-tag';

export const fields = `
    tenantIds
    status
    accountRecipientIds
    tenantRecipientIds
    scopeRecipients
    tagRecipients
    sendAt
    isImportant
    subject
    body
    link
    isInternalLink
    image
    icon
    attachments
    totalRecipients
    reads
    meta
    createdAt
    updatedAt
`;

export const relationsFields = `
    iamGetTenants: iamGetWithTenantConstraintTenants (
        query: $queryGetTenants
        constraint: $constraintGetTenants
    ) {
        id
        name
        parentId
        parent {
            id
            name
        }
        isActive
    }
    oAuthGetScopes (
        query: $queryGetScopes
        constraint: $constraintGetScopes
    ) {
        id
        code
        name
    }
    iamGetTags (
        query: $queryGetTags
        constraint: $constraintGetTags
    ) {
        id
        name
    }
    iamGetSelectedTenants: iamGetWithTenantConstraintTenants (
        query: $queryGetSelectedTenants
        constraint: $constraintGetSelectedTenants
    ) {
        id
        name
    }
    oAuthGetSelectedScopes: oAuthGetScopes (
        query: $queryGetSelectedScopes
        constraint: $constraintGetSelectedScopes
    ) {
        id
        code
        name
    }
    iamGetSelectedTags: iamGetTags (
        query: $queryGetSelectedTags
        constraint: $constraintGetSelectedTags
    ) {
        id
        name
    }
`;

// default methods
export const paginationQuery = gql`
    query MessagePaginateMessages (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: messagePaginateMessages (
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
    query MessageGetMessages (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: messageGetMessages (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const getRelations = gql`
    query MessageGetMessagesRelations(
        $queryGetTenants: QueryStatement
        $constraintGetTenants: QueryStatement
        $queryGetScopes: QueryStatement
        $constraintGetScopes: QueryStatement
        $queryGetTags: QueryStatement
        $constraintGetTags: QueryStatement
        $queryGetSelectedTenants: QueryStatement
        $constraintGetSelectedTenants: QueryStatement
        $queryGetSelectedScopes: QueryStatement
        $constraintGetSelectedScopes: QueryStatement
        $queryGetSelectedTags: QueryStatement
        $constraintGetSelectedTags: QueryStatement
    ) {
        ${relationsFields}
    }
`;

export const findByIdQuery = gql`
    query MessageFindMessageById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: messageFindMessageById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdWithRelationsQuery = gql`
    query MessageFindMessageByIdWithRelations (
        $id: ID
        $constraint: QueryStatement
        $queryGetTenants: QueryStatement
        $constraintGetTenants: QueryStatement
        $queryGetScopes: QueryStatement
        $constraintGetScopes: QueryStatement
        $queryGetTags: QueryStatement
        $constraintGetTags: QueryStatement
        $queryGetSelectedTenants: QueryStatement
        $constraintGetSelectedTenants: QueryStatement
        $queryGetSelectedScopes: QueryStatement
        $constraintGetSelectedScopes: QueryStatement
        $queryGetSelectedTags: QueryStatement
        $constraintGetSelectedTags: QueryStatement
    ) {
        object: messageFindMessageById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
        ${relationsFields}
    }
`;

export const findQuery = gql`
    query MessageFindMessage (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: messageFindMessage (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation MessageCreateMessage (
        $payload: MessageCreateMessageInput!
    ) {
        messageCreateMessage (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation MessageUpdateMessageById (
        $payload: MessageUpdateMessageByIdInput!
        $constraint: QueryStatement
    ) {
        messageUpdateMessageById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation MessageUpdateMessages (
        $payload: MessageUpdateMessagesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        messageUpdateMessages (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation MessageDeleteMessageById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        messageDeleteMessageById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation MessageDeleteMessages (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        messageDeleteMessages (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

// Queries additionalApis
export const countTotalRecipientsMessageQuery = gql`
    query MessageCountTotalRecipientsMessage (
        $tenantRecipientIds: [ID]
        $scopeRecipients: [GraphQLString]
        $tagRecipients: [GraphQLString]
        $accountRecipientIds: [ID]
        $constraint: QueryStatement
    ) {
        messageCountTotalRecipientsMessage (
            tenantRecipientIds: $tenantRecipientIds
            scopeRecipients: $scopeRecipients
            tagRecipients: $tagRecipients
            accountRecipientIds: $accountRecipientIds
            constraint: $constraint
        )
    }
`;

// Mutation additionalApis
export const removeAttachmentMessageMutation = gql`
    mutation MessageRemoveAttachmentMessage (
        $message: MessageUpdateMessageByIdInput!
        $attachmentId: ID!
        $constraint: QueryStatement
    ) {
        messageRemoveAttachmentMessage (
            message: $message
            attachmentId: $attachmentId
            constraint: $constraint
        )
    }
`;

export const sendMessageMessageMutation = gql`
    mutation MessageSendMessageMessage (
        $message: MessageUpdateMessageByIdInput!
        $constraint: QueryStatement
    ) {
        messageSendMessageMessage (
            message: $message
            constraint: $constraint
        )
    }
`;

export const draftMessageMessageMutation = gql`
    mutation MessageDraftMessageMessage (
        $message: MessageUpdateMessageByIdInput!
        $constraint: QueryStatement
    ) {
        messageDraftMessageMessage (
            message: $message
            constraint: $constraint
        )
    }
`;
