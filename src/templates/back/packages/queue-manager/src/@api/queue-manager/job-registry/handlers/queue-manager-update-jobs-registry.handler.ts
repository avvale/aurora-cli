import { QueueManagerJobRegistry, QueueManagerUpdateJobsRegistryInput } from '@api/graphql';
import { QueueManagerJobRegistryDto, QueueManagerUpdateJobsRegistryDto } from '@api/queue-manager/job-registry';
import { QueueManagerGetJobsRegistryQuery, QueueManagerUpdateJobsRegistryCommand } from '@app/queue-manager/job-registry';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagerUpdateJobsRegistryHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: QueueManagerUpdateJobsRegistryInput | QueueManagerUpdateJobsRegistryDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<QueueManagerJobRegistry | QueueManagerJobRegistryDto>
    {
        await this.commandBus.dispatch(new QueueManagerUpdateJobsRegistryCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new QueueManagerGetJobsRegistryQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
