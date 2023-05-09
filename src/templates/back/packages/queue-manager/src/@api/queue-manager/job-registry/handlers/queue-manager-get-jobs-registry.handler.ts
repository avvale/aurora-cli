import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { GetJobsRegistryQuery } from '@app/queue-manager/job-registry/application/get/get-jobs-registry.query';
import { QueueManagerJobRegistry } from '@api/graphql';
import { QueueManagerJobRegistryDto } from '../dto';

@Injectable()
export class QueueManagerGetJobsRegistryHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<QueueManagerJobRegistry[] | QueueManagerJobRegistryDto[]>
    {
        return await this.queryBus.ask(new GetJobsRegistryQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}