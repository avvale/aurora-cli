import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { FindQueueByIdQuery } from '@app/queue-manager/queue/application/find/find-queue-by-id.query';
import { DeleteQueueByIdCommand } from '@app/queue-manager/queue/application/delete/delete-queue-by-id.command';
import { QueueManagerQueue } from '@api/graphql';
import { QueueManagerQueueDto } from '../dto';

@Injectable()
export class QueueManagerDeleteQueueByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<QueueManagerQueue | QueueManagerQueueDto>
    {
        const queue = await this.queryBus.ask(new FindQueueByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new DeleteQueueByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return queue;
    }
}