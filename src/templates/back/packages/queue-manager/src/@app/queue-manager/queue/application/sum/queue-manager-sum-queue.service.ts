import { QueueManagerIQueueRepository } from '@app/queue-manager/queue';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagerSumQueueService
{
    constructor(
        private readonly repository: QueueManagerIQueueRepository,
    ) {}

    async main(
        column: string,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<number>
    {
        return await this.repository.sum(
            column,
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );
    }
}
