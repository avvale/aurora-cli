import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { QueueManagerIQueueRepository } from '../../domain/queue-manager-queue.repository';
import { QueueManagerQueue } from '../../domain/queue-manager-queue.aggregate';

@Injectable()
export class QueueManagerRawSQLQueuesService
{
    constructor(
        private readonly repository: QueueManagerIQueueRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<QueueManagerQueue[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
