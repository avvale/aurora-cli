import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { QueueManagerCreateQueuesCommand } from '@app/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';

@Injectable()
export class QueueManagerQueueSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new QueueManagerCreateQueuesCommand(
            queueManagerMockQueueData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
