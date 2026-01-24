import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//
import {
  QueueManagerCreateQueuesCommand,
  queueManagerMockQueueData,
} from '@app/queue-manager/queue';

@Injectable()
export class QueueManagerQueueSeeder {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(): Promise<boolean> {
    await this.commandBus.dispatch(
      new QueueManagerCreateQueuesCommand(queueManagerMockQueueData, {
        timezone: process.env.TZ,
      }),
    );

    return true;
  }
}
