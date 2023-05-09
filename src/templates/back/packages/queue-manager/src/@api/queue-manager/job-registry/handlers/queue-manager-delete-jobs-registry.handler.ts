import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { GetJobsRegistryQuery } from '@app/queue-manager/job-registry/application/get/get-jobs-registry.query';
import { DeleteJobsRegistryCommand } from '@app/queue-manager/job-registry/application/delete/delete-jobs-registry.command';
import { QueueManagerJobRegistry } from '@api/graphql';
import { QueueManagerJobRegistryDto } from '../dto';

@Injectable()
export class QueueManagerDeleteJobsRegistryHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<QueueManagerJobRegistry[] | QueueManagerJobRegistryDto[]>
    {
        const jobsRegistry = await this.queryBus.ask(new GetJobsRegistryQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new DeleteJobsRegistryCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return jobsRegistry;
    }
}