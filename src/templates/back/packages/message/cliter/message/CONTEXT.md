# Message

## Purpose

Internal notification and messaging system for application-wide communications. Enables administrators to send messages to users based on various targeting criteria (accounts, tenants, scopes, tags). Supports draft/send workflows, read tracking, and scheduled delivery.

## Modules

| Module | Responsibility |
|--------|----------------|
| message | Master message records created by administrators. Defines content (subject, body, attachments), targeting criteria, scheduling, and tracks delivery statistics (totalRecipients, reads). |
| inbox | Per-user message copies delivered to recipients. Contains denormalized message content for fast retrieval. Tracks individual read status and allows user-specific actions (delete, mark read/unread). |
| outbox | Delivery queue records. Stores the original targeting criteria (accounts, tenants, scopes, tags) used for message distribution. Links to master message for audit trail. |
| inbox-setting | User-specific inbox configuration. Tracks the last read message row ID to efficiently identify new messages since last check. |

## Key Business Rules

- **Message Status Flow**: DRAFT (editing) -> PENDING (scheduled) -> SENT (delivered to inboxes).
- **Targeting Options**: Messages can target specific accounts, tenants, OAuth scopes, or account tags. Multiple criteria are combined (OR logic).
- **Denormalized Delivery**: Each recipient gets an inbox copy with denormalized message content for independent lifecycle (user can delete their copy).
- **Read Tracking**: isRead for current state, isReadAtLeastOnce for historical tracking. Global reads counter on message aggregate.
- **Multi-Tenant**: Messages support tenant-scoping via tenantIds array with GIN index.

## Main Flows

1. **Draft Message**: Create message with DRAFT status -> Edit content and recipients -> Save changes.
2. **Send Message**: draft-message or send-message API -> Calculate totalRecipients -> Create inbox entries for each recipient -> Update status to SENT.
3. **Check New Messages**: check-messages API -> Compare inbox entries against lastReadMessageRowId -> Return count of new messages.
4. **Read Message**: find-customer-message API -> Mark isRead=true -> Increment message.reads counter if isReadAtLeastOnce was false.

## Dependencies

- **Uses**: iam (account targeting, tenant filtering, scope/tag resolution)
- **Used by**: None (end-user facing domain)

## Technical Notes

- **GIN Indexes**: All recipient arrays (accountRecipientIds, tenantRecipientIds, scopeRecipients, tagRecipients) use GIN indexes for efficient array containment queries.
- **Row ID Tracking**: inbox-setting.lastReadMessageRowId uses bigint rowId (not UUID) for efficient greater-than comparisons.
- **Customer APIs**: Separate APIs for customer (end-user) operations: paginate-customer-messages, find-customer-message, delete-customer-message.
- **Attachment Storage**: Message attachments stored as JSONB for flexible structure (images, documents, links).
- **Internal Links**: isInternalLink flag indicates if link field points to an internal route vs. external URL.
