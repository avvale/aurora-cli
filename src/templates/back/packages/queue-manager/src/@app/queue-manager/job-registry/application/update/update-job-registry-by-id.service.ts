import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
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
export class UpdateJobRegistryByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobRegistryRepository,
    ) {}

    async main(
        payload: {
            id: JobRegistryId;
            queueName?: JobRegistryQueueName;
            jobId?: JobRegistryJobId;
            jobName?: JobRegistryJobName;
            tags?: JobRegistryTags;
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const jobRegistry = QueueManagerJobRegistry.register(
            payload.id,
            payload.queueName,
            payload.jobId,
            payload.jobName,
            payload.tags,
            null, // createdAt
            new JobRegistryUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update by id
        await this.repository.updateById(jobRegistry, {
            constraint,
            cQMetadata,
            updateByIdOptions: cQMetadata?.repositoryOptions,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const jobRegistryRegister = this.publisher.mergeObjectContext(
            jobRegistry,
        );

        jobRegistryRegister.updated(jobRegistry); // apply event to model events
        jobRegistryRegister.commit(); // commit all events of model
    }
}