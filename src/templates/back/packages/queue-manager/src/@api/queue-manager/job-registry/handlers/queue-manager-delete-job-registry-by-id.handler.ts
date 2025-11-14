import { QueueManagerJobRegistry } from '@api/graphql';
import { QueueManagerJobRegistryDto } from '@api/queue-manager/job-registry';
import {
    QueueManagerDeleteJobRegistryByIdCommand,
    QueueManagerFindJobRegistryByIdQuery,
} from '@app/queue-manager/job-registry';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagerDeleteJobRegistryByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<QueueManagerJobRegistry | QueueManagerJobRegistryDto> {
        const jobRegistry = await this.queryBus.ask(
            new QueueManagerFindJobRegistryByIdQuery(id, constraint, {
                timezone,
            }),
        );

        await this.commandBus.dispatch(
            new QueueManagerDeleteJobRegistryByIdCommand(id, constraint, {
                timezone,
            }),
        );

        return jobRegistry;
    }
}
