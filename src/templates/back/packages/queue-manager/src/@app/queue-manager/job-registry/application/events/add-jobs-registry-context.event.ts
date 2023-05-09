import { AggregateRoot } from '@nestjs/cqrs';
import { QueueManagerJobRegistry } from '../../domain/job-registry.aggregate';
import { CreatedJobRegistryEvent } from './created-job-registry.event';
import { CreatedJobsRegistryEvent } from './created-jobs-registry.event';
import { UpdatedJobRegistryEvent } from './updated-job-registry.event';
import { UpdatedJobsRegistryEvent } from './updated-jobs-registry.event';
import { DeletedJobRegistryEvent } from './deleted-job-registry.event';
import { DeletedJobsRegistryEvent } from './deleted-jobs-registry.event';

export class AddJobsRegistryContextEvent extends AggregateRoot
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
            new CreatedJobsRegistryEvent(
                this.aggregateRoots.map(jobRegistry =>
                    new CreatedJobRegistryEvent(
                        jobRegistry.id.value,
                        jobRegistry.queueName.value,
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
            new UpdatedJobsRegistryEvent(
                this.aggregateRoots.map(jobRegistry =>
                    new UpdatedJobRegistryEvent(
                        jobRegistry.id.value,
                        jobRegistry.queueName.value,
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
            new DeletedJobsRegistryEvent(
                this.aggregateRoots.map(jobRegistry =>
                    new DeletedJobRegistryEvent(
                        jobRegistry.id.value,
                        jobRegistry.queueName.value,
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