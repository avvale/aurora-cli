import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
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
import { QueueManagerJobRegistry } from '../../domain/queue-manager-job-registry.aggregate';
import { queueManagerMockJobRegistryData } from './queue-manager-mock-job-registry.data';
import * as _ from 'lodash';

@Injectable()
export class QueueManagerMockJobRegistrySeeder extends MockSeeder<QueueManagerJobRegistry>
{
    public collectionSource: QueueManagerJobRegistry[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const jobRegistry of _.orderBy(queueManagerMockJobRegistryData, ['id']))
        {
            this.collectionSource.push(
                QueueManagerJobRegistry.register(
                    new QueueManagerJobRegistryId(jobRegistry.id),
                    new QueueManagerJobRegistryQueueName(jobRegistry.queueName),
                    new QueueManagerJobRegistryState(jobRegistry.state),
                    new QueueManagerJobRegistryJobId(jobRegistry.jobId),
                    new QueueManagerJobRegistryJobName(jobRegistry.jobName),
                    new QueueManagerJobRegistryTags(jobRegistry.tags),
                    new QueueManagerJobRegistryCreatedAt({ currentTimestamp: true }),
                    new QueueManagerJobRegistryUpdatedAt({ currentTimestamp: true }),
                    new QueueManagerJobRegistryDeletedAt(null),
                ),
            );
        }
    }
}
