import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from '@aurora-ts/core';
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
export class CreateJobsRegistryService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobRegistryRepository,
    ) {}

    async main(
        jobsRegistry: {
            id: JobRegistryId;
            queueName: JobRegistryQueueName;
            jobId: JobRegistryJobId;
            jobName: JobRegistryJobName;
            tags: JobRegistryTags;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateJobsRegistry = jobsRegistry.map(jobRegistry => QueueManagerJobRegistry.register(
            jobRegistry.id,
            jobRegistry.queueName,
            jobRegistry.jobId,
            jobRegistry.jobName,
            jobRegistry.tags,
            new JobRegistryCreatedAt({ currentTimestamp: true }),
            new JobRegistryUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(aggregateJobsRegistry, { insertOptions: cQMetadata?.repositoryOptions });

        // create AddJobsRegistryContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const jobsRegistryRegistered = this.publisher.mergeObjectContext(new AddJobsRegistryContextEvent(aggregateJobsRegistry));

        jobsRegistryRegistered.created(); // apply event to model events
        jobsRegistryRegistered.commit(); // commit all events of model
    }
}