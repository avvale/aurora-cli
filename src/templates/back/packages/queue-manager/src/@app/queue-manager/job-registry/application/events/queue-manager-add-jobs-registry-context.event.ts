import { AggregateRoot } from '@nestjs/cqrs';
import { QueueManagerJobRegistry } from '../../domain/queue-manager-job-registry.aggregate';
import { QueueManagerCreatedJobRegistryEvent } from './queue-manager-created-job-registry.event';
import { QueueManagerCreatedJobsRegistryEvent } from './queue-manager-created-jobs-registry.event';
import { QueueManagerUpdatedJobRegistryEvent } from './queue-manager-updated-job-registry.event';
import { QueueManagerUpdatedJobsRegistryEvent } from './queue-manager-updated-jobs-registry.event';
import { QueueManagerDeletedJobRegistryEvent } from './queue-manager-deleted-job-registry.event';
import { QueueManagerDeletedJobsRegistryEvent } from './queue-manager-deleted-jobs-registry.event';

export class QueueManagerAddJobsRegistryContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: QueueManagerJobRegistry[] = [],
    )
    {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void
    {
        this.apply(
            new QueueManagerCreatedJobsRegistryEvent(
                this.aggregateRoots.map(jobRegistry =>
                    new QueueManagerCreatedJobRegistryEvent(
                        jobRegistry.id.value,
                        jobRegistry.queueName.value,
                        jobRegistry.state.value,
                        jobRegistry.jobId.value,
                        jobRegistry.jobName?.value,
                        jobRegistry.tags?.value,
                        jobRegistry.createdAt?.value,
                        jobRegistry.updatedAt?.value,
                        jobRegistry.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new QueueManagerUpdatedJobsRegistryEvent(
                this.aggregateRoots.map(jobRegistry =>
                    new QueueManagerUpdatedJobRegistryEvent(
                        jobRegistry.id.value,
                        jobRegistry.queueName.value,
                        jobRegistry.state.value,
                        jobRegistry.jobId.value,
                        jobRegistry.jobName?.value,
                        jobRegistry.tags?.value,
                        jobRegistry.createdAt?.value,
                        jobRegistry.updatedAt?.value,
                        jobRegistry.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new QueueManagerDeletedJobsRegistryEvent(
                this.aggregateRoots.map(jobRegistry =>
                    new QueueManagerDeletedJobRegistryEvent(
                        jobRegistry.id.value,
                        jobRegistry.queueName.value,
                        jobRegistry.state.value,
                        jobRegistry.jobId.value,
                        jobRegistry.jobName?.value,
                        jobRegistry.tags?.value,
                        jobRegistry.createdAt?.value,
                        jobRegistry.updatedAt?.value,
                        jobRegistry.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
