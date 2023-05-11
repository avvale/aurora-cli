import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';

// @app
import { FindQueueByIdQuery } from '@app/queue-manager/queue/application/find/find-queue-by-id.query';
import { UpdateQueueByIdCommand } from '@app/queue-manager/queue/application/update/update-queue-by-id.command';
import { QueueManagerQueue, QueueManagerUpdateQueueByIdInput } from '@api/graphql';
import { QueueManagerQueueDto, QueueManagerUpdateQueueByIdDto } from '../dto';

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
        const queue = await this.queryBus.ask(new FindQueueByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, queue);

        await this.commandBus.dispatch(new UpdateQueueByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new FindQueueByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}