import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindJobRegistryQuery } from '@app/queue-manager/job-registry/application/find/find-job-registry.query';
import { QueueManagerJobRegistry } from '@api/graphql';
import { QueueManagerJobRegistryDto } from '../dto';

@Injectable()
export class QueueManagerFindJobRegistryHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<QueueManagerJobRegistry | QueueManagerJobRegistryDto>
    {
        return await this.queryBus.ask(new FindJobRegistryQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}