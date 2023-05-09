import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurora-ts/core';
import { IQueueRepository } from '@app/queue-manager/queue/domain/queue.repository';
import {
    QueueId,
    QueuePrefix,
    QueueName,
    QueueCreatedAt,
    QueueUpdatedAt,
    QueueDeletedAt,
} from '@app/queue-manager/queue/domain/value-objects';
import { QueueManagerQueue } from '../../domain/queue.aggregate';
import { queues } from './mock-queue.data';

@Injectable()
export class MockQueueRepository extends MockRepository<QueueManagerQueue> implements IQueueRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'QueueManagerQueue';
    public collectionSource: QueueManagerQueue[];
    public deletedAtInstance: QueueDeletedAt = new QueueDeletedAt(null);

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

        for (const itemCollection of <any[]>queues)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(QueueManagerQueue.register(
                new QueueId(itemCollection.id),
                new QueuePrefix(itemCollection.prefix),
                new QueueName(itemCollection.name),
                new QueueCreatedAt(itemCollection.createdAt),
                new QueueUpdatedAt(itemCollection.updatedAt),
                new QueueDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}