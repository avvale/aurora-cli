import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurora-ts/core';

// @app
import { FindQueueByIdQuery } from '@app/queue-manager/queue/application/find/find-queue-by-id.query';
import { UpsertQueueCommand } from '@app/queue-manager/queue/application/upsert/upsert-queue.command';
import { QueueManagerQueue, QueueManagerUpdateQueueByIdInput } from '@api/graphql';
import { QueueManagerQueueDto, QueueManagerUpdateQueueByIdDto } from '../dto';

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
        await this.commandBus.dispatch(new UpsertQueueCommand(
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