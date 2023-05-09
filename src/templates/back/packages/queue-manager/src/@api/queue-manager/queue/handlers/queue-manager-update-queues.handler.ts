import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { GetQueuesQuery } from '@app/queue-manager/queue/application/get/get-queues.query';
import { UpdateQueuesCommand } from '@app/queue-manager/queue/application/update/update-queues.command';
import { QueueManagerQueue, QueueManagerUpdateQueuesInput } from '@api/graphql';
import { QueueManagerQueueDto, QueueManagerUpdateQueuesDto } from '../dto';

@Injectable()
export class QueueManagerUpdateQueuesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: QueueManagerUpdateQueuesInput | QueueManagerUpdateQueuesDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<QueueManagerQueue | QueueManagerQueueDto>
    {
        await this.commandBus.dispatch(new UpdateQueuesCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new GetQueuesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}