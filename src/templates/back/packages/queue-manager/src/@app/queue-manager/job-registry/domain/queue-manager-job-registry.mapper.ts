import {
  QueueManagerJobRegistry,
  QueueManagerJobRegistryResponse,
} from '@app/queue-manager/job-registry';
import {
  QueueManagerJobRegistryCreatedAt,
  QueueManagerJobRegistryDeletedAt,
  QueueManagerJobRegistryId,
  QueueManagerJobRegistryJobId,
  QueueManagerJobRegistryJobName,
  QueueManagerJobRegistryQueueName,
  QueueManagerJobRegistryRowId,
  QueueManagerJobRegistryState,
  QueueManagerJobRegistryTags,
  QueueManagerJobRegistryUpdatedAt,
} from '@app/queue-manager/job-registry/domain/value-objects';
import {
  CQMetadata,
  IMapper,
  LiteralObject,
  MapperOptions,
} from '@aurorajs.dev/core';

export class QueueManagerJobRegistryMapper implements IMapper {
  constructor(public options: MapperOptions = { eagerLoading: true }) {}

  /**
   * Map object to aggregate
   * @param jobRegistry
   */
  mapModelToAggregate(
    jobRegistry: LiteralObject,
    cQMetadata?: CQMetadata,
  ): QueueManagerJobRegistry {
    if (!jobRegistry) return;

    return this.makeAggregate(jobRegistry, cQMetadata);
  }

  /**
   * Map array of objects to array aggregates
   * @param jobsRegistry
   */
  mapModelsToAggregates(
    jobsRegistry: LiteralObject[],
    cQMetadata?: CQMetadata,
  ): QueueManagerJobRegistry[] {
    if (!Array.isArray(jobsRegistry)) return;

    return jobsRegistry.map((jobRegistry) =>
      this.makeAggregate(jobRegistry, cQMetadata),
    );
  }

  /**
   * Map aggregate to response
   * @param jobRegistry
   */
  mapAggregateToResponse(
    jobRegistry: QueueManagerJobRegistry,
  ): QueueManagerJobRegistryResponse {
    return this.makeResponse(jobRegistry);
  }

  /**
   * Map array of aggregates to array responses
   * @param jobsRegistry
   */
  mapAggregatesToResponses(
    jobsRegistry: QueueManagerJobRegistry[],
  ): QueueManagerJobRegistryResponse[] {
    if (!Array.isArray(jobsRegistry)) return;

    return jobsRegistry.map((jobRegistry) => this.makeResponse(jobRegistry));
  }

  private makeAggregate(
    jobRegistry: LiteralObject,
    cQMetadata?: CQMetadata,
  ): QueueManagerJobRegistry {
    return QueueManagerJobRegistry.register(
      new QueueManagerJobRegistryId(jobRegistry.id, {
        undefinable: true,
      }),
      new QueueManagerJobRegistryRowId(jobRegistry.rowId, {
        undefinable: true,
      }),
      new QueueManagerJobRegistryQueueName(jobRegistry.queueName, {
        undefinable: true,
      }),
      new QueueManagerJobRegistryState(jobRegistry.state, {
        undefinable: true,
      }),
      new QueueManagerJobRegistryJobId(jobRegistry.jobId, {
        undefinable: true,
      }),
      new QueueManagerJobRegistryJobName(jobRegistry.jobName, {
        undefinable: true,
      }),
      new QueueManagerJobRegistryTags(jobRegistry.tags, {
        undefinable: true,
      }),
      new QueueManagerJobRegistryCreatedAt(
        jobRegistry.createdAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
      new QueueManagerJobRegistryUpdatedAt(
        jobRegistry.updatedAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
      new QueueManagerJobRegistryDeletedAt(
        jobRegistry.deletedAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
    );
  }

  private makeResponse(
    jobRegistry: QueueManagerJobRegistry,
  ): QueueManagerJobRegistryResponse {
    if (!jobRegistry) return null;

    return new QueueManagerJobRegistryResponse(
      jobRegistry.id.value,
      jobRegistry.rowId.value,
      jobRegistry.queueName.value,
      jobRegistry.state.value,
      jobRegistry.jobId.value,
      jobRegistry.jobName.value,
      jobRegistry.tags.value,
      jobRegistry.createdAt.value,
      jobRegistry.updatedAt.value,
      jobRegistry.deletedAt.value,
    );
  }
}
