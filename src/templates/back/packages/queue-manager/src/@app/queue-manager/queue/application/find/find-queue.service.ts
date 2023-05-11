import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { IQueueRepository } from '../../domain/queue.repository';
import { QueueManagerQueue } from '../../domain/queue.aggregate';

@Injectable()
export class FindQueueService
{
    constructor(
        private readonly repository: IQueueRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<QueueManagerQueue>
    {
        return await this.repository.find({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}