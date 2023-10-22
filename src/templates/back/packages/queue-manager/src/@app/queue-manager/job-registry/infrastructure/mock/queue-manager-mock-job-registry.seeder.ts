import { QueueManagerJobRegistry, queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
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
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
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
