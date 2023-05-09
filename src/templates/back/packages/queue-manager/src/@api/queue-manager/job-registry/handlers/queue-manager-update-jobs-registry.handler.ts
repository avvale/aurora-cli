import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { GetJobsRegistryQuery } from '@app/queue-manager/job-registry/application/get/get-jobs-registry.query';
import { UpdateJobsRegistryCommand } from '@app/queue-manager/job-registry/application/update/update-jobs-registry.command';
import { QueueManagerJobRegistry, QueueManagerUpdateJobsRegistryInput } from '@api/graphql';
import { QueueManagerJobRegistryDto, QueueManagerUpdateJobsRegistryDto } from '../dto';

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
        await this.commandBus.dispatch(new UpdateJobsRegistryCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new GetJobsRegistryQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}