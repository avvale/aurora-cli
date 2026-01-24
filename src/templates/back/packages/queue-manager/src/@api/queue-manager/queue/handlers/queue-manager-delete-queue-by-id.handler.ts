import { QueueManagerQueue } from '@api/graphql';
import { QueueManagerQueueDto } from '@api/queue-manager/queue';
import {
  QueueManagerDeleteQueueByIdCommand,
  QueueManagerFindQueueByIdQuery,
} from '@app/queue-manager/queue';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagerDeleteQueueByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
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

    await this.commandBus.dispatch(
      new QueueManagerDeleteQueueByIdCommand(id, constraint, {
        timezone,
      }),
    );

    return queue;
  }
}
