import { QueueManagerCreatedJobRegistryEvent, QueueManagerCreatedJobsRegistryEvent, QueueManagerDeletedJobRegistryEvent, QueueManagerDeletedJobsRegistryEvent, QueueManagerJobRegistry, QueueManagerUpdatedJobRegistryEvent, QueueManagerUpdatedJobsRegistryEvent } from '@app/queue-manager/job-registry';
import { AggregateRoot } from '@nestjs/cqrs';

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
