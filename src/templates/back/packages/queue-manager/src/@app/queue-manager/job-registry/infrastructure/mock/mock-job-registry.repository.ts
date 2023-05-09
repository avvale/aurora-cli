import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurora-ts/core';
import { IJobRegistryRepository } from '@app/queue-manager/job-registry/domain/job-registry.repository';
import {
    JobRegistryId,
    JobRegistryQueueName,
    JobRegistryJobId,
    JobRegistryJobName,
    JobRegistryTags,
    JobRegistryCreatedAt,
    JobRegistryUpdatedAt,
    JobRegistryDeletedAt,
} from '@app/queue-manager/job-registry/domain/value-objects';
import { QueueManagerJobRegistry } from '../../domain/job-registry.aggregate';
import { jobsRegistry } from './mock-job-registry.data';

@Injectable()
export class MockJobRegistryRepository extends MockRepository<QueueManagerJobRegistry> implements IJobRegistryRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'QueueManagerJobRegistry';
    public collectionSource: QueueManagerJobRegistry[];
    public deletedAtInstance: JobRegistryDeletedAt = new JobRegistryDeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset(): void
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>jobsRegistry)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(QueueManagerJobRegistry.register(
                new JobRegistryId(itemCollection.id),
                new JobRegistryQueueName(itemCollection.queueName),
                new JobRegistryJobId(itemCollection.jobId),
                new JobRegistryJobName(itemCollection.jobName),
                new JobRegistryTags(itemCollection.tags),
                new JobRegistryCreatedAt(itemCollection.createdAt),
                new JobRegistryUpdatedAt(itemCollection.updatedAt),
                new JobRegistryDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}