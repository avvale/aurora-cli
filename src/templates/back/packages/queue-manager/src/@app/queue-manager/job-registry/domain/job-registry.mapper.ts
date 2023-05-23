import { LiteralObject } from '@nestjs/common';
import { IMapper, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { QueueManagerJobRegistry } from './job-registry.aggregate';
import { JobRegistryResponse } from './job-registry.response';
import {
    JobRegistryId,
    JobRegistryQueueName,
    JobRegistryState,
    JobRegistryJobId,
    JobRegistryJobName,
    JobRegistryTags,
    JobRegistryCreatedAt,
    JobRegistryUpdatedAt,
    JobRegistryDeletedAt,
} from './value-objects';

export class JobRegistryMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param jobRegistry
     */
    mapModelToAggregate(jobRegistry: LiteralObject, cQMetadata?: CQMetadata): QueueManagerJobRegistry
    {
        if (!jobRegistry) return;

        return this.makeAggregate(jobRegistry, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param jobsRegistry
     */
    mapModelsToAggregates(jobsRegistry: LiteralObject[], cQMetadata?: CQMetadata): QueueManagerJobRegistry[]
    {
        if (!Array.isArray(jobsRegistry)) return;

        return jobsRegistry.map(jobRegistry => this.makeAggregate(jobRegistry, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param jobRegistry
     */
    mapAggregateToResponse(jobRegistry: QueueManagerJobRegistry): JobRegistryResponse
    {
        return this.makeResponse(jobRegistry);
    }

    /**
     * Map array of aggregates to array responses
     * @param jobsRegistry
     */
    mapAggregatesToResponses(jobsRegistry: QueueManagerJobRegistry[]): JobRegistryResponse[]
    {
        if (!Array.isArray(jobsRegistry)) return;

        return jobsRegistry.map(jobRegistry => this.makeResponse(jobRegistry));
    }

    private makeAggregate(jobRegistry: LiteralObject, cQMetadata?: CQMetadata): QueueManagerJobRegistry
    {
        return QueueManagerJobRegistry.register(
            new JobRegistryId(jobRegistry.id, { undefinable: true }),
            new JobRegistryQueueName(jobRegistry.queueName, { undefinable: true }),
            new JobRegistryState(jobRegistry.state, { undefinable: true }),
            new JobRegistryJobId(jobRegistry.jobId, { undefinable: true }),
            new JobRegistryJobName(jobRegistry.jobName, { undefinable: true }),
            new JobRegistryTags(jobRegistry.tags, { undefinable: true }),
            new JobRegistryCreatedAt(jobRegistry.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new JobRegistryUpdatedAt(jobRegistry.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new JobRegistryDeletedAt(jobRegistry.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
        );
    }

    private makeResponse(jobRegistry: QueueManagerJobRegistry): JobRegistryResponse
    {
        if (!jobRegistry) return;

        return new JobRegistryResponse(
            jobRegistry.id.value,
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