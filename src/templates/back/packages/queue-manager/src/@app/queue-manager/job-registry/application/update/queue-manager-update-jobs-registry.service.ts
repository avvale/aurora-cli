import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    QueueManagerJobRegistryId,
    QueueManagerJobRegistryQueueName,
    QueueManagerJobRegistryState,
    QueueManagerJobRegistryJobId,
    QueueManagerJobRegistryJobName,
    QueueManagerJobRegistryTags,
    QueueManagerJobRegistryCreatedAt,
    QueueManagerJobRegistryUpdatedAt,
    QueueManagerJobRegistryDeletedAt,
} from '../../domain/value-objects';
import { QueueManagerIJobRegistryRepository } from '../../domain/queue-manager-job-registry.repository';
import { QueueManagerJobRegistry } from '../../domain/queue-manager-job-registry.aggregate';
import { QueueManagerAddJobsRegistryContextEvent } from '../events/queue-manager-add-jobs-registry-context.event';

@Injectable()
export class QueueManagerUpdateJobsRegistryService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: QueueManagerIJobRegistryRepository,
    ) {}

    async main(
        payload: {
            id?: QueueManagerJobRegistryId;
            queueName?: QueueManagerJobRegistryQueueName;
            state?: QueueManagerJobRegistryState;
            jobId?: QueueManagerJobRegistryJobId;
            jobName?: QueueManagerJobRegistryJobName;
            tags?: QueueManagerJobRegistryTags;
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
            payload.state,
            payload.jobId,
            payload.jobName,
            payload.tags,
            null, // createdAt
            new QueueManagerJobRegistryUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(
            jobRegistry,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const jobsRegistry = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const jobsRegistryRegister = this.publisher.mergeObjectContext(
            new QueueManagerAddJobsRegistryContextEvent(jobsRegistry),
        );

        jobsRegistryRegister.updated(); // apply event to model events
        jobsRegistryRegister.commit(); // commit all events of model
    }
}
