import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetQueuesQuery } from '@app/queue-manager/queue/application/get/get-queues.query';
import { DeleteQueuesCommand } from '@app/queue-manager/queue/application/delete/delete-queues.command';
import { QueueManagerQueue } from '@api/graphql';
import { QueueManagerQueueDto } from '../dto';

@Injectable()
export class QueueManagerDeleteQueuesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<QueueManagerQueue[] | QueueManagerQueueDto[]>
    {
        const queues = await this.queryBus.ask(new GetQueuesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new DeleteQueuesCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return queues;
    }
}