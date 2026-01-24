import { QueueManagerQueue } from '@api/graphql';
import { QueueManagerQueueDto } from '@api/queue-manager/queue';
import {
  QueueManagerDeleteQueuesCommand,
  QueueManagerGetQueuesQuery,
} from '@app/queue-manager/queue';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagerDeleteQueuesHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<QueueManagerQueue[] | QueueManagerQueueDto[]> {
    const queues = await this.queryBus.ask(
      new QueueManagerGetQueuesQuery(queryStatement, constraint, {
        timezone,
      }),
    );

    await this.commandBus.dispatch(
      new QueueManagerDeleteQueuesCommand(queryStatement, constraint, {
        timezone,
      }),
    );

    return queues;
  }
}
