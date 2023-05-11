import { ConflictException, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    JobRegistryId,
    JobRegistryQueueName,
    JobRegistryJobId,
    JobRegistryJobName,
    JobRegistryTags,
    JobRegistryCreatedAt,
    JobRegistryUpdatedAt,
    JobRegistryDeletedAt,
} from '../../domain/value-objects';
import { IJobRegistryRepository } from '../../domain/job-registry.repository';
import { QueueManagerJobRegistry } from '../../domain/job-registry.aggregate';

@Injectable()
export class UpsertJobRegistryService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobRegistryRepository,
    ) {}

    async main(
        payload: {
            id: JobRegistryId;
            queueName: JobRegistryQueueName;
            jobId: JobRegistryJobId;
            jobName: JobRegistryJobName;
            tags: JobRegistryTags;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // upsert aggregate with factory pattern
        const jobRegistry = QueueManagerJobRegistry.register(
            payload.id,
            payload.queueName,
            payload.jobId,
            payload.jobName,
            payload.tags,
            new JobRegistryCreatedAt({ currentTimestamp: true }),
            new JobRegistryUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository
            .upsert(jobRegistry, {
                upsertOptions: cQMetadata?.repositoryOptions,
            });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const jobRegistryRegister = this.publisher.mergeObjectContext(
            jobRegistry,
        );

        jobRegistryRegister.created(jobRegistry); // apply event to model events
        jobRegistryRegister.commit(); // commit all events of model
    }
}