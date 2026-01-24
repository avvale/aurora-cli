# Support

## Purpose

Customer support and issue tracking domain. Enables users to report issues, bugs, and feature requests with rich media attachments (screenshots, screen recordings). Supports threaded comments and external issue tracker integration.

## Modules

| Module | Responsibility |
|--------|----------------|
| issue | Support tickets/issues reported by users. Captures environment info (front/back version, environment), subject, description, attachments, and screen recordings. Links to external issue trackers via externalId. |
| comment | Threaded comments on issues. Supports nested replies (parentId), attachments, and screen recordings. Can sync with external systems via externalId/externalParentId. |

## Key Business Rules

- **Reporter Context**: Issues capture the reporter's accountId, username, displayName, and environment context (versions, environment type).
- **Rich Media**: Both issues and comments support JSONB attachments and screen recordings for visual bug reports.
- **External Sync**: externalId fields enable bidirectional sync with external issue trackers (Jira, GitHub Issues, etc.).
- **Status Tracking**: externalStatus and externalColorStatus reflect the issue state in external systems.
- **No Hard Delete**: Issues cannot be deleted (excluded operation) to preserve support history.

## Main Flows

1. **Report Issue**: User submits issue -> Capture environment context -> Store attachments/recordings -> Optionally create in external tracker.
2. **Add Comment**: Select issue -> Create comment with optional parent (for replies) -> Sync to external tracker if configured.
3. **External Sync**: Webhook receives external update -> Match by externalId -> Update externalStatus/externalColorStatus.
4. **Configure Webhook**: create-webhook API sets up external tracker integration -> delete-webhook removes it.

## Dependencies

- **Uses**: iam (reporter account information)
- **Used by**: None (end-user facing domain)

## Technical Notes

- **Nested Comments**: comment.parentId enables threaded discussions with unlimited nesting depth.
- **External Parent Mapping**: externalParentId maps parent relationships in external systems (may differ from internal parentId).
- **Version Tracking**: frontVersion/backVersion capture app versions for reproduction.
- **Environment Context**: frontEnvironment/backEnvironment distinguish dev/staging/production for issue triage.
- **Webhook Config APIs**: Support context has special APIs for webhook setup (create-webhook, delete-webhook) separate from tools/webhook.
- **No Batch Create**: createBatch excluded to ensure proper issue tracking and external sync per issue.
