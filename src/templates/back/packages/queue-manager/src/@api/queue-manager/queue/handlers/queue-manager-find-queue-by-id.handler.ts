import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { FindQueueByIdQuery } from '@app/queue-manager/queue/application/find/find-queue-by-id.query';
import { QueueManagerQueue } from '@api/graphql';
import { QueueManagerQueueDto } from '../dto';
import { QueueRedisImplementationService } from '@api/queue-manager/shared/services';

@Injectable()
export class QueueManagerFindQueueByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
        private readonly queueRedisImplementationService: QueueRedisImplementationService,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<QueueManagerQueue | QueueManagerQueueDto>
    {
        const queue = await this.queryBus.ask(new FindQueueByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queueRedisImplementationService.addQueueCounters(queue);
    }
}