import { QueueManagerQueue } from '@api/graphql';
import { QueueManagerQueueDto } from '@api/queue-manager/queue';
import { QueueManagerGetQueuesQuery } from '@app/queue-manager/queue';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagerGetQueuesHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<QueueManagerQueue[] | QueueManagerQueueDto[]> {
        return await this.queryBus.ask(
            new QueueManagerGetQueuesQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
