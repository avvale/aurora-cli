import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetQueuesQuery } from '@app/queue-manager/queue/application/get/get-queues.query';
import { QueueManagerQueue } from '@api/graphql';
import { QueueManagerQueueDto } from '../dto';

@Injectable()
export class QueueManagerGetQueuesHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<QueueManagerQueue[] | QueueManagerQueueDto[]>
    {
        return await this.queryBus.ask(new GetQueuesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}