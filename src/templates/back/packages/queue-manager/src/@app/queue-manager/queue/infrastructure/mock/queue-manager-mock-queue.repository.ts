import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { QueueManagerIQueueRepository } from '@app/queue-manager/queue/domain/queue-manager-queue.repository';
import {
    QueueManagerQueueId,
    QueueManagerQueuePrefix,
    QueueManagerQueueName,
    QueueManagerQueueCreatedAt,
    QueueManagerQueueUpdatedAt,
    QueueManagerQueueDeletedAt,
} from '@app/queue-manager/queue/domain/value-objects';
import { QueueManagerQueue } from '../../domain/queue-manager-queue.aggregate';
import { queueManagerMockQueueData } from './queue-manager-mock-queue.data';

@Injectable()
export class QueueManagerMockQueueRepository extends MockRepository<QueueManagerQueue> implements QueueManagerIQueueRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'QueueManagerQueue';
    public collectionSource: QueueManagerQueue[];
    public deletedAtInstance: QueueManagerQueueDeletedAt = new QueueManagerQueueDeletedAt(null);

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

        for (const itemCollection of <any[]>queueManagerMockQueueData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(QueueManagerQueue.register(
                new QueueManagerQueueId(itemCollection.id),
                new QueueManagerQueuePrefix(itemCollection.prefix),
                new QueueManagerQueueName(itemCollection.name),
                new QueueManagerQueueCreatedAt(itemCollection.createdAt),
                new QueueManagerQueueUpdatedAt(itemCollection.updatedAt),
                new QueueManagerQueueDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
