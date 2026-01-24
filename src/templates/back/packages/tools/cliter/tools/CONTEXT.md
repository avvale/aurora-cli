# Tools

## Purpose

Developer and operations tooling for database management, configuration, and integrations. Provides infrastructure for database migrations, stored procedures, webhooks, and application-wide key-value configuration. Central hub for cross-cutting technical concerns.

## Modules

| Module | Responsibility |
|--------|----------------|
| migration | Database schema migration management. Tracks migration scripts (up/down), versioning, execution status, and provides APIs for running migrations programmatically. |
| procedure | Database stored procedure, function, and trigger management. Tracks versioning, execution, and hash-based change detection for procedural database objects. |
| webhook | Outbound webhook configuration. Defines endpoints, events to trigger, HMAC secrets for signature verification, and service-specific metadata. |
| webhook-log | Append-only audit log for incoming webhook requests. Records URL, headers, and body of each webhook invocation for debugging and compliance. |
| key-value | Application-wide configuration store. Supports multiple data types (string, number, boolean, date, object, array, secret) with caching and activation control. |

## Key Business Rules

- **Migration Workflow**: Create migration -> isActive=true to enable -> Run up-script -> isExecuted=true on success.
- **Procedure Versioning**: Procedures tracked by version; hash comparison detects drift between code and database.
- **Webhook Signatures**: HMAC-SHA signatures using secret field enable receivers to verify payload authenticity.
- **Configuration Types**: key-value supports 9 types including SECRET for encrypted sensitive data.
- **Append-Only Logs**: webhook-log excludes update operations to ensure audit trail integrity.

## Main Flows

1. **Run Migrations**: Query active, unexecuted migrations -> Execute up-scripts in order -> Mark isExecuted=true -> Set executedAt timestamp.
2. **Deploy Procedure**: Create/update procedure record -> Run up-script API -> Mark isExecuted=true -> Hash stored for drift detection.
3. **Rollback Migration**: Execute down-script -> Set isExecuted=false -> Migration can be re-run after fixes.
4. **Send Webhook**: Event occurs -> Find matching webhook by events array -> POST to endpoint with HMAC signature -> Log response.
5. **Get Configuration**: Query key-value by key -> Check isActive -> Parse value according to type -> Return (use cache if isCached=true).

## Dependencies

- **Uses**: None (infrastructure domain)
- **Used by**: All bounded contexts (configuration), external systems (webhooks)

## Technical Notes

- **Script Content**: upScript and downScript store raw SQL/DDL for direct database execution.
- **Hash Verification**: procedure.hash is SHA-256 of upScript for detecting local vs. deployed differences.
- **Event Patterns**: webhook.events supports wildcards (e.g., "user.*") for flexible event subscription.
- **Secret Encryption**: key-value with type=SECRET should be encrypted at rest (application responsibility).
- **Execution Order**: migration.executionOrder and procedure.sort control execution sequence within same version.
- **Webhook Digest**: digest API generates HMAC signatures for manual testing.
