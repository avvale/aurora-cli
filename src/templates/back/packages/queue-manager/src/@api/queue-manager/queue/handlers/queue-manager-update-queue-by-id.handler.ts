import { QueueManagerQueue, QueueManagerUpdateQueueByIdInput } from '@api/graphql';
import { QueueManagerQueueDto, QueueManagerUpdateQueueByIdDto } from '@api/queue-manager/queue';
import { QueueManagerFindQueueByIdQuery, QueueManagerUpdateQueueByIdCommand } from '@app/queue-manager/queue';
import { ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagerUpdateQueueByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: QueueManagerUpdateQueueByIdInput | QueueManagerUpdateQueueByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<QueueManagerQueue | QueueManagerQueueDto>
    {
        const queue = await this.queryBus.ask(new QueueManagerFindQueueByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, queue);

        await this.commandBus.dispatch(new QueueManagerUpdateQueueByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new QueueManagerFindQueueByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
