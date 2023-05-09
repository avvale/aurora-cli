import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindJobRegistryByIdQuery } from '@app/queue-manager/job-registry/application/find/find-job-registry-by-id.query';
import { QueueManagerJobRegistry } from '@api/graphql';
import { QueueManagerJobRegistryDto } from '../dto';

@Injectable()
export class QueueManagerFindJobRegistryByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<QueueManagerJobRegistry | QueueManagerJobRegistryDto>
    {
        return await this.queryBus.ask(new FindJobRegistryByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}