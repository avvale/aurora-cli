import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { QueueManagerIJobRegistryRepository } from '@app/queue-manager/job-registry/domain/queue-manager-job-registry.repository';
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
} from '@app/queue-manager/job-registry/domain/value-objects';
import { QueueManagerJobRegistry } from '../../domain/queue-manager-job-registry.aggregate';
import { queueManagerMockJobRegistryData } from './queue-manager-mock-job-registry.data';

@Injectable()
export class QueueManagerMockJobRegistryRepository extends MockRepository<QueueManagerJobRegistry> implements QueueManagerIJobRegistryRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'QueueManagerJobRegistry';
    public collectionSource: QueueManagerJobRegistry[];
    public deletedAtInstance: QueueManagerJobRegistryDeletedAt = new QueueManagerJobRegistryDeletedAt(null);

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

        for (const itemCollection of <any[]>queueManagerMockJobRegistryData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(QueueManagerJobRegistry.register(
                new QueueManagerJobRegistryId(itemCollection.id),
                new QueueManagerJobRegistryQueueName(itemCollection.queueName),
                new QueueManagerJobRegistryState(itemCollection.state),
                new QueueManagerJobRegistryJobId(itemCollection.jobId),
                new QueueManagerJobRegistryJobName(itemCollection.jobName),
                new QueueManagerJobRegistryTags(itemCollection.tags),
                new QueueManagerJobRegistryCreatedAt(itemCollection.createdAt),
                new QueueManagerJobRegistryUpdatedAt(itemCollection.updatedAt),
                new QueueManagerJobRegistryDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
