import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindJobRegistryByIdQuery } from '@app/queue-manager/job-registry/application/find/find-job-registry-by-id.query';
import { DeleteJobRegistryByIdCommand } from '@app/queue-manager/job-registry/application/delete/delete-job-registry-by-id.command';
import { QueueManagerJobRegistry } from '@api/graphql';
import { QueueManagerJobRegistryDto } from '../dto';

@Injectable()
export class QueueManagerDeleteJobRegistryByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<QueueManagerJobRegistry | QueueManagerJobRegistryDto>
    {
        const jobRegistry = await this.queryBus.ask(new FindJobRegistryByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new DeleteJobRegistryByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return jobRegistry;
    }
}