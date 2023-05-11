import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { CreateJobsRegistryCommand } from '@app/queue-manager/job-registry/application/create/create-jobs-registry.command';
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

@Injectable()
export class QueueManagerJobRegistrySeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateJobsRegistryCommand(
            jobsRegistry,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}