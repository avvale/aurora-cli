import { QueueManagerAddJobsRegistryContextEvent, QueueManagerIJobRegistryRepository, QueueManagerJobRegistry } from '@app/queue-manager/job-registry';
import {
    QueueManagerJobRegistryCreatedAt,
    QueueManagerJobRegistryDeletedAt,
    QueueManagerJobRegistryId,
    QueueManagerJobRegistryJobId,
    QueueManagerJobRegistryJobName,
    QueueManagerJobRegistryQueueName,
    QueueManagerJobRegistryState,
    QueueManagerJobRegistryTags,
    QueueManagerJobRegistryUpdatedAt,
} from '@app/queue-manager/job-registry/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class QueueManagerCreateJobsRegistryService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: QueueManagerIJobRegistryRepository,
    ) {}

    async main(
        jobsRegistry: {
            id: QueueManagerJobRegistryId;
            queueName: QueueManagerJobRegistryQueueName;
            state: QueueManagerJobRegistryState;
            jobId: QueueManagerJobRegistryJobId;
            jobName: QueueManagerJobRegistryJobName;
            tags: QueueManagerJobRegistryTags;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateJobsRegistry = jobsRegistry.map(jobRegistry => QueueManagerJobRegistry.register(
            jobRegistry.id,
            jobRegistry.queueName,
            jobRegistry.state,
            jobRegistry.jobId,
            jobRegistry.jobName,
            jobRegistry.tags,
            new QueueManagerJobRegistryCreatedAt({ currentTimestamp: true }),
            new QueueManagerJobRegistryUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateJobsRegistry,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddJobsRegistryContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const jobsRegistryRegistered = this.publisher.mergeObjectContext(new QueueManagerAddJobsRegistryContextEvent(aggregateJobsRegistry));

        jobsRegistryRegistered.created(); // apply event to model events
        jobsRegistryRegistered.commit(); // commit all events of model
    }
}
