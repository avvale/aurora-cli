import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { FindQueueQuery } from '@app/queue-manager/queue/application/find/find-queue.query';
import { QueueManagerQueue } from '@api/graphql';
import { QueueManagerQueueDto } from '../dto';

@Injectable()
export class QueueManagerFindQueueHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<QueueManagerQueue | QueueManagerQueueDto>
    {
        return await this.queryBus.ask(new FindQueueQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}