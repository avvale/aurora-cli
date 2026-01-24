# WhatsApp

## Purpose

WhatsApp Business API integration for customer communication. Manages bidirectional messaging through WhatsApp, tracking conversations, message delivery status, and billing information. Enables businesses to communicate with customers via WhatsApp channels.

## Modules

| Module | Responsibility |
|--------|----------------|
| message | Individual WhatsApp messages (inbound and outbound). Tracks WABA message ID, delivery statuses (ACCEPTED, DELIVERED, READ, SENT), message type (text, image, template, etc.), and payload content. |
| conversation | WhatsApp conversation sessions with billing metadata. Tracks conversation ID, category, expiration, pricing model, and billable status. Links messages within a 24-hour conversation window. |
| timeline | Communication threads between a business phone number and customer contact. Groups all messages and conversations for a specific phone number + contact pair. Supports multiple operator accounts per timeline. |

## Key Business Rules

- **Message Direction**: INPUT for customer-initiated messages, OUTPUT for business-initiated messages.
- **Status Progression**: Messages progress through statuses: ACCEPTED -> SENT -> DELIVERED -> READ.
- **Conversation Windows**: WhatsApp conversations have 24-hour windows. New conversations created when window expires.
- **Billing Categories**: Conversations are categorized (utility, marketing, authentication, service) with different pricing models.
- **Contact Identification**: Customers identified by wabaContactId (WhatsApp ID), optionally linked to IAM accounts.

## Main Flows

1. **Receive Message**: Webhook receives WABA message -> Create/find timeline -> Create message with INPUT direction -> Link to conversation if exists.
2. **Send Message**: Select timeline -> Create message with OUTPUT direction -> Send via WABA API -> Update status on webhook callbacks.
3. **Track Delivery**: WABA sends status webhooks -> Update message.statuses array -> Accumulate all received statuses.
4. **Conversation Billing**: WABA sends conversation webhook -> Create conversation record -> Track billing metadata for cost analysis.

## Dependencies

- **Uses**: iam (optional account linking for operators and customers)
- **Used by**: None (integration domain)

## Technical Notes

- **WABA IDs**: External WhatsApp Business API identifiers stored as strings (wabaMessageId, wabaConversationId, wabaPhoneNumberId, wabaContactId).
- **No Auditing**: hasAuditing=false for high-volume message processing performance.
- **Composite Index**: timeline uses composite unique index on (wabaPhoneNumberId, wabaContactId) for efficient lookup.
- **Message Types**: Supports all WhatsApp types: TEXT, IMAGE, VIDEO, AUDIO, DOCUMENT, TEMPLATE, INTERACTIVE, LOCATION, CONTACTS, STICKER, REACTION, etc.
- **Payload Storage**: Full message payload stored as JSONB for type-specific content without schema constraints.
- **Account Array**: timeline.accounts array allows multiple operators to handle a conversation.
