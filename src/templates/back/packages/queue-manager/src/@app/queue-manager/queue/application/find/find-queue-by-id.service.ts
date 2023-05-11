import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { IQueueRepository } from '../../domain/queue.repository';
import { QueueManagerQueue } from '../../domain/queue.aggregate';
import { QueueId } from '../../domain/value-objects';

@Injectable()
export class FindQueueByIdService
{
    constructor(
        private readonly repository: IQueueRepository,
    ) {}

    async main(
        id: QueueId,
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