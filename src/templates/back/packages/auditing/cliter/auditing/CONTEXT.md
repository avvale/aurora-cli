# Auditing

## Purpose

System-wide audit trail and logging infrastructure. Tracks all data modifications (side effects) and external HTTP communications for compliance, debugging, and data recovery. Enables rollback of changes and reprocessing of failed external calls.

## Modules

| Module | Responsibility |
|--------|----------------|
| side-effect | Audit log of all data changes in the system. Records who (accountId, email), what (modelPath, modelName, event), when (createdAt), and the before/after values (oldValue, newValue). Supports rollback functionality. |
| http-communication | Log of external HTTP requests and responses. Tracks request/response payloads, success/failure events, and enables reprocessing of failed communications. |

## Key Business Rules

- **Complete Audit Trail**: Every CRUD operation on audited entities generates a side-effect record with full before/after snapshots.
- **Event Types**: CREATED, UPDATED, DELETED, RESTORED for single records; BULK_* variants for batch operations; UPSERTED for upsert operations.
- **Immutable Logs**: Audit records are append-only (update operations excluded) to ensure trail integrity.
- **Rollback Support**: Side effects can be rolled back, creating a new side-effect with isRollback=true and reference to original.
- **Communication Events**: HTTP logs track REQUEST_FULFILLED, REQUEST_REJECTED, RESPONSE_FULFILLED, RESPONSE_REJECTED states.

## Main Flows

1. **Record Side Effect**: Entity changes -> Interceptor captures oldValue/newValue -> Creates side-effect with operation metadata -> Stores request context (IP, method, userAgent).
2. **Rollback Change**: Select side-effect -> Validate rollbackable -> Apply oldValue to entity -> Create new side-effect with isRollback=true and rollbackSideEffectId reference.
3. **Log HTTP Call**: Before external call -> Log REQUEST_FULFILLED with request data -> After response -> Update with RESPONSE_* event and response data.
4. **Reprocess Failed Call**: Find failed http-communication -> Resubmit request -> Create new record with isReprocessing=true and reprocessingHttpCommunicationId reference.

## Dependencies

- **Uses**: iam (accountId, email for attribution)
- **Used by**: All bounded contexts with hasAuditing=true (automatic side-effect generation)

## Technical Notes

- **No Self-Auditing**: hasAuditing=false on both modules to prevent infinite recursion.
- **JSONB Values**: oldValue, newValue, httpRequest, httpResponse stored as JSONB for flexible schemas.
- **Operation Grouping**: operationId and operationSort group related side-effects in batch operations.
- **Tag Filtering**: Both modules support tags array with GIN index for categorizing and filtering audit records.
- **Request Context**: side-effect captures full request context: IP, HTTP method, baseUrl, params, query, body, userAgent.
- **Timestamp Indexing**: createdAt indexed for efficient time-range queries in audit reports.
