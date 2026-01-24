# Queue Manager

## Purpose

Background job and queue management infrastructure. Provides visibility and control over asynchronous job processing through Redis/Bull queues. Tracks job states, enables monitoring of queue health, and supports job lifecycle management.

## Modules

| Module | Responsibility |
|--------|----------------|
| queue | Queue definitions with unique prefix+name combinations. Represents Bull/Redis queues available for job processing. Used as a registry of active queues in the system. |
| job-registry | Individual job tracking within queues. Records job state transitions (WAITING, ACTIVE, COMPLETED, FAILED, DELAYED, PAUSED), job identifiers, and optional tags for categorization. |

## Key Business Rules

- **Queue Identification**: Queues identified by prefix+name combination (composite unique index). Prefix typically represents the bounded context.
- **Job States**: Standard Bull queue states: WAITING (queued), ACTIVE (processing), COMPLETED (success), FAILED (error), DELAYED (scheduled), PAUSED (suspended).
- **Default Job Name**: Jobs without explicit names use "__default__" as jobName.
- **Tag-Based Filtering**: Jobs can be tagged for categorized monitoring and bulk operations.

## Main Flows

1. **Register Queue**: Create queue record with prefix and name -> Queue becomes visible in management UI.
2. **Track Job**: Job enters queue -> Create job-registry entry with WAITING state -> Update state on job lifecycle events.
3. **Monitor Queue Health**: Query job-registry by queueName -> Aggregate by state -> Display queue statistics.
4. **Debug Failed Jobs**: Filter job-registry by state=FAILED -> Inspect job details -> Retry or remove failed jobs.

## Dependencies

- **Uses**: None (infrastructure domain)
- **Used by**: Any bounded context using background jobs (message sending, webhook delivery, etc.)

## Technical Notes

- **No Auditing**: hasAuditing=false as job tracking is high-volume operational data.
- **Composite Index**: queue uses composite unique on (prefix, name) for efficient lookups.
- **GIN Index on Tags**: job-registry.tags uses GIN index for efficient tag filtering.
- **State Index**: job-registry.state indexed for fast state-based queries.
- **External Job IDs**: jobId stores the Bull queue job identifier for correlation with Redis data.
