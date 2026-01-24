import { QueueManagerCreateQueueInput, QueueManagerQueue } from '@api/graphql';
import {
  QueueManagerCreateQueueDto,
  QueueManagerQueueDto,
} from '@api/queue-manager/queue';
import {
  QueueManagerCreateQueueCommand,
  QueueManagerFindQueueByIdQuery,
} from '@app/queue-manager/queue';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagerCreateQueueHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: QueueManagerCreateQueueInput | QueueManagerCreateQueueDto,
    timezone?: string,
  ): Promise<QueueManagerQueue | QueueManagerQueueDto> {
    await this.commandBus.dispatch(
      new QueueManagerCreateQueueCommand(payload, {
        timezone,
      }),
    );

    return await this.queryBus.ask(
      new QueueManagerFindQueueByIdQuery(
        payload.id,
        {},
        {
          timezone,
        },
      ),
    );
  }
}
