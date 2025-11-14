import {
    QueueManagerIJobRegistryRepository,
    QueueManagerJobRegistry,
    queueManagerMockJobRegistryData,
} from '@app/queue-manager/job-registry';
import {
    QueueManagerJobRegistryCreatedAt,
    QueueManagerJobRegistryDeletedAt,
    QueueManagerJobRegistryId,
    QueueManagerJobRegistryJobId,
    QueueManagerJobRegistryJobName,
    QueueManagerJobRegistryQueueName,
    QueueManagerJobRegistryRowId,
    QueueManagerJobRegistryState,
    QueueManagerJobRegistryTags,
    QueueManagerJobRegistryUpdatedAt,
} from '@app/queue-manager/job-registry/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagerMockJobRegistryRepository
    extends MockRepository<QueueManagerJobRegistry>
    implements QueueManagerIJobRegistryRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'QueueManagerJobRegistry';
    public collectionSource: QueueManagerJobRegistry[];

    constructor() {
        super();
        this.createSourceMockData();
    }

    public reset(): void {
        this.createSourceMockData();
    }

    private createSourceMockData(): void {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>queueManagerMockJobRegistryData) {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(
                QueueManagerJobRegistry.register(
                    new QueueManagerJobRegistryId(itemCollection.id),
                    new QueueManagerJobRegistryRowId(itemCollection.rowId),
                    new QueueManagerJobRegistryQueueName(
                        itemCollection.queueName,
                    ),
                    new QueueManagerJobRegistryState(itemCollection.state),
                    new QueueManagerJobRegistryJobId(itemCollection.jobId),
                    new QueueManagerJobRegistryJobName(itemCollection.jobName),
                    new QueueManagerJobRegistryTags(itemCollection.tags),
                    new QueueManagerJobRegistryCreatedAt(
                        itemCollection.createdAt,
                    ),
                    new QueueManagerJobRegistryUpdatedAt(
                        itemCollection.updatedAt,
                    ),
                    new QueueManagerJobRegistryDeletedAt(
                        itemCollection.deletedAt,
                    ),
                ),
            );
        }
    }
}
