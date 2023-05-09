import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus } from '@aurora-ts/core';

// @app
import { CreateJobsRegistryCommand } from '@app/queue-manager/job-registry/application/create/create-jobs-registry.command';
import { QueueManagerCreateJobRegistryInput } from '@api/graphql';
import { QueueManagerCreateJobRegistryDto } from '../dto';

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
        await this.commandBus.dispatch(new CreateJobsRegistryCommand(
            payload,
            {
                timezone,
            },
        ));
        return true;
    }
}