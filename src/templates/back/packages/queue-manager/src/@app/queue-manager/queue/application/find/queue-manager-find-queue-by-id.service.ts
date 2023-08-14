import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { QueueManagerIQueueRepository } from '../../domain/queue-manager-queue.repository';
import { QueueManagerQueue } from '../../domain/queue-manager-queue.aggregate';
import { QueueManagerQueueId } from '../../domain/value-objects';

@Injectable()
export class QueueManagerFindQueueByIdService
{
    constructor(
        private readonly repository: QueueManagerIQueueRepository,
    ) {}

    async main(
        id: QueueManagerQueueId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<QueueManagerQueue>
    {
        return await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );
    }
}
