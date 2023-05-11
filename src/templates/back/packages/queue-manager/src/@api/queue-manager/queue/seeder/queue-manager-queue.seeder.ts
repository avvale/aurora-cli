import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { CreateQueuesCommand } from '@app/queue-manager/queue/application/create/create-queues.command';
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

@Injectable()
export class QueueManagerQueueSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateQueuesCommand(
            queues,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}