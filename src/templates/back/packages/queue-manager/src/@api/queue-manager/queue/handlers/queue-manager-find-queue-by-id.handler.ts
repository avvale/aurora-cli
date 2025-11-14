import { QueueManagerQueue } from '@api/graphql';
import { QueueManagerQueueDto } from '@api/queue-manager/queue';
import { QueueRedisImplementationService } from '@api/queue-manager/shared/services';
import { QueueManagerFindQueueByIdQuery } from '@app/queue-manager/queue';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagerFindQueueByIdHandler {
    constructor(
        private readonly queryBus: IQueryBus,
        private readonly queueRedisImplementationService: QueueRedisImplementationService,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<QueueManagerQueue | QueueManagerQueueDto> {
        const queue = await this.queryBus.ask(
            new QueueManagerFindQueueByIdQuery(id, constraint, {
                timezone,
            }),
        );

        return await this.queueRedisImplementationService.addQueueCounters(
            queue,
        );
    }
}
