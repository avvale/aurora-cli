import { QueueManagerCreateJobRegistryInput } from '@api/graphql';
import { QueueManagerCreateJobRegistryDto } from '@api/queue-manager/job-registry';
import { QueueManagerCreateJobsRegistryCommand } from '@app/queue-manager/job-registry';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagerCreateJobsRegistryHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: QueueManagerCreateJobRegistryInput[] | QueueManagerCreateJobRegistryDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new QueueManagerCreateJobsRegistryCommand(
            payload,
            {
                timezone,
            },
        ));

        return true;
    }
}
