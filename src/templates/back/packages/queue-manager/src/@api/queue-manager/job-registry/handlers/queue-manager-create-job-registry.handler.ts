import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// @app
import { FindJobRegistryByIdQuery } from '@app/queue-manager/job-registry/application/find/find-job-registry-by-id.query';
import { CreateJobRegistryCommand } from '@app/queue-manager/job-registry/application/create/create-job-registry.command';
import { QueueManagerJobRegistry, QueueManagerCreateJobRegistryInput } from '@api/graphql';
import { QueueManagerJobRegistryDto, QueueManagerCreateJobRegistryDto } from '../dto';

@Injectable()
export class QueueManagerCreateJobRegistryHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: QueueManagerCreateJobRegistryInput | QueueManagerCreateJobRegistryDto,
        timezone?: string,
    ): Promise<QueueManagerJobRegistry | QueueManagerJobRegistryDto>
    {
        await this.commandBus.dispatch(new CreateJobRegistryCommand(
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