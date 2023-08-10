import { QueueManagerQueue, QueueManagerUpdateQueueByIdInput } from '@api/graphql';
import { QueueManagerQueueDto, QueueManagerUpdateQueueByIdDto } from '@api/queue-manager/queue';
import { QueueManagerFindQueueByIdQuery, QueueManagerUpsertQueueCommand } from '@app/queue-manager/queue';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagerUpsertQueueHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: QueueManagerUpdateQueueByIdInput | QueueManagerUpdateQueueByIdDto,
        timezone?: string,
    ): Promise<QueueManagerQueue | QueueManagerQueueDto>
    {
        await this.commandBus.dispatch(new QueueManagerUpsertQueueCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new QueueManagerFindQueueByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
