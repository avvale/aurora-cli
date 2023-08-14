import { QueueManagerJobRegistry, QueueManagerUpdateJobRegistryByIdInput } from '@api/graphql';
import { QueueManagerJobRegistryDto, QueueManagerUpdateJobRegistryByIdDto } from '@api/queue-manager/job-registry';
import { QueueManagerFindJobRegistryByIdQuery, QueueManagerUpsertJobRegistryCommand } from '@app/queue-manager/job-registry';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
        await this.commandBus.dispatch(new QueueManagerUpsertJobRegistryCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new QueueManagerFindJobRegistryByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
