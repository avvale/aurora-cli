import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    QueueId,
    QueuePrefix,
    QueueName,
    QueueCreatedAt,
    QueueUpdatedAt,
    QueueDeletedAt,
} from '../../domain/value-objects';
import { QueueManagerQueue } from '../../domain/queue.aggregate';
import { queues } from './mock-queue.data';
import * as _ from 'lodash';

@Injectable()
export class MockQueueSeeder extends MockSeeder<QueueManagerQueue>
{
    public collectionSource: QueueManagerQueue[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (const queue of _.orderBy(queues, ['id']))
        {
            this.collectionSource.push(
                QueueManagerQueue.register(
                    new QueueId(queue.id),
                    new QueuePrefix(queue.prefix),
                    new QueueName(queue.name),
                    new QueueCreatedAt({ currentTimestamp: true }),
                    new QueueUpdatedAt({ currentTimestamp: true }),
                    new QueueDeletedAt(null),
                ),
            );
        }
    }
}