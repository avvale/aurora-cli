import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';

// @app
import { CreateQueuesCommand } from '@app/queue-manager/queue/application/create/create-queues.command';
import { QueueManagerCreateQueueInput } from '@api/graphql';
import { QueueManagerCreateQueueDto } from '../dto';

@Injectable()
export class QueueManagerCreateQueuesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: QueueManagerCreateQueueInput[] | QueueManagerCreateQueueDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateQueuesCommand(
            payload,
            {
                timezone,
            },
        ));
        return true;
    }
}