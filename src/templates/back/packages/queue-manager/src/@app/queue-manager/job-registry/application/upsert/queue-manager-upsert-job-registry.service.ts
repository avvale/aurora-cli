import { QueueManagerIJobRegistryRepository, QueueManagerJobRegistry } from '@app/queue-manager/job-registry';
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
import { CQMetadata, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class QueueManagerUpsertJobRegistryService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: QueueManagerIJobRegistryRepository,
    ) {}

    async main(
        payload: {
            id: QueueManagerJobRegistryId;
            queueName: QueueManagerJobRegistryQueueName;
            state: QueueManagerJobRegistryState;
            jobId: QueueManagerJobRegistryJobId;
            jobName: QueueManagerJobRegistryJobName;
            tags: QueueManagerJobRegistryTags;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // upsert aggregate with factory pattern
        const jobRegistry = QueueManagerJobRegistry.register(
            payload.id,
            payload.queueName,
            payload.state,
            payload.jobId,
            payload.jobName,
            payload.tags,
            new QueueManagerJobRegistryCreatedAt({ currentTimestamp: true }),
            new QueueManagerJobRegistryUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository
            .upsert(
                jobRegistry,
                {
                    upsertOptions: cQMetadata?.repositoryOptions,
                },
            );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const jobRegistryRegister = this.publisher.mergeObjectContext(
            jobRegistry,
        );

        jobRegistryRegister.created(jobRegistry); // apply event to model events
        jobRegistryRegister.commit(); // commit all events of model
    }
}
