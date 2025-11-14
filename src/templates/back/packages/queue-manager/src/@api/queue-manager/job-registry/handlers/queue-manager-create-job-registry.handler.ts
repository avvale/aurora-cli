import {
    QueueManagerCreateJobRegistryInput,
    QueueManagerJobRegistry,
} from '@api/graphql';
import {
    QueueManagerCreateJobRegistryDto,
    QueueManagerJobRegistryDto,
} from '@api/queue-manager/job-registry';
import {
    QueueManagerCreateJobRegistryCommand,
    QueueManagerFindJobRegistryByIdQuery,
} from '@app/queue-manager/job-registry';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagerCreateJobRegistryHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload:
            | QueueManagerCreateJobRegistryInput
            | QueueManagerCreateJobRegistryDto,
        timezone?: string,
    ): Promise<QueueManagerJobRegistry | QueueManagerJobRegistryDto> {
        await this.commandBus.dispatch(
            new QueueManagerCreateJobRegistryCommand(payload, {
                timezone,
            }),
        );

        return await this.queryBus.ask(
            new QueueManagerFindJobRegistryByIdQuery(
                payload.id,
                {},
                {
                    timezone,
                },
            ),
        );
    }
}
