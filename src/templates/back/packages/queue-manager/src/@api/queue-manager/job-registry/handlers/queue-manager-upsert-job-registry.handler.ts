import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurora-ts/core';

// @app
import { FindJobRegistryByIdQuery } from '@app/queue-manager/job-registry/application/find/find-job-registry-by-id.query';
import { UpsertJobRegistryCommand } from '@app/queue-manager/job-registry/application/upsert/upsert-job-registry.command';
import { QueueManagerJobRegistry, QueueManagerUpdateJobRegistryByIdInput } from '@api/graphql';
import { QueueManagerJobRegistryDto, QueueManagerUpdateJobRegistryByIdDto } from '../dto';

@Injectable()
export class QueueManagerUpsertJobRegistryHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: QueueManagerUpdateJobRegistryByIdInput | QueueManagerUpdateJobRegistryByIdDto,
        timezone?: string,
    ): Promise<QueueManagerJobRegistry | QueueManagerJobRegistryDto>
    {
        await this.commandBus.dispatch(new UpsertJobRegistryCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new FindJobRegistryByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}