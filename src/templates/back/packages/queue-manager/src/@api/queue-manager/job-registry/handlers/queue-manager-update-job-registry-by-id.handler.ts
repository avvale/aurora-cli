import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurora-ts/core';

// @app
import { FindJobRegistryByIdQuery } from '@app/queue-manager/job-registry/application/find/find-job-registry-by-id.query';
import { UpdateJobRegistryByIdCommand } from '@app/queue-manager/job-registry/application/update/update-job-registry-by-id.command';
import { QueueManagerJobRegistry, QueueManagerUpdateJobRegistryByIdInput } from '@api/graphql';
import { QueueManagerJobRegistryDto, QueueManagerUpdateJobRegistryByIdDto } from '../dto';

@Injectable()
export class QueueManagerUpdateJobRegistryByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: QueueManagerUpdateJobRegistryByIdInput | QueueManagerUpdateJobRegistryByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<QueueManagerJobRegistry | QueueManagerJobRegistryDto>
    {
        const jobRegistry = await this.queryBus.ask(new FindJobRegistryByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, jobRegistry);

        await this.commandBus.dispatch(new UpdateJobRegistryByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new FindJobRegistryByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}