import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurora-ts/core';

// @app
import { FindQueueByIdQuery } from '@app/queue-manager/queue/application/find/find-queue-by-id.query';
import { CreateQueueCommand } from '@app/queue-manager/queue/application/create/create-queue.command';
import { QueueManagerQueue, QueueManagerCreateQueueInput } from '@api/graphql';
import { QueueManagerQueueDto, QueueManagerCreateQueueDto } from '../dto';

@Injectable()
export class QueueManagerCreateQueueHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: QueueManagerCreateQueueInput | QueueManagerCreateQueueDto,
        timezone?: string,
    ): Promise<QueueManagerQueue | QueueManagerQueueDto>
    {
        await this.commandBus.dispatch(new CreateQueueCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new FindQueueByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}