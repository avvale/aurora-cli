import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//
import {
    QueueManagerCreateJobsRegistryCommand,
    queueManagerMockJobRegistryData,
} from '@app/queue-manager/job-registry';

@Injectable()
export class QueueManagerJobRegistrySeeder {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean> {
        await this.commandBus.dispatch(
            new QueueManagerCreateJobsRegistryCommand(
                queueManagerMockJobRegistryData,
                {
                    timezone: process.env.TZ,
                },
            ),
        );

        return true;
    }
}
