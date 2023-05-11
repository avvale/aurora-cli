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
import { AddJobsRegistryContextEvent } from '../events/add-jobs-registry-context.event';

@Injectable()
export class UpdateJobsRegistryService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobRegistryRepository,
    ) {}

    async main(
        payload: {
            id?: JobRegistryId;
            queueName?: JobRegistryQueueName;
            jobId?: JobRegistryJobId;
            jobName?: JobRegistryJobName;
            tags?: JobRegistryTags;
        },
        queryStatement?: QueryStatement,
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


        // update
        await this.repository.update(jobRegistry, {
            queryStatement,
            constraint,
            cQMetadata,
            updateOptions: cQMetadata?.repositoryOptions,
        });

        // get objects to delete
        const jobsRegistry = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const jobsRegistryRegister = this.publisher.mergeObjectContext(
            new AddJobsRegistryContextEvent(jobsRegistry),
        );

        jobsRegistryRegister.updated(); // apply event to model events
        jobsRegistryRegister.commit(); // commit all events of model
    }
}