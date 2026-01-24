import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//
import {
  ToolsCreateWebhookLogsCommand,
  toolsMockWebhookLogData,
} from '@app/tools/webhook-log';

@Injectable()
export class ToolsWebhookLogSeeder {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(): Promise<boolean> {
    await this.commandBus.dispatch(
      new ToolsCreateWebhookLogsCommand(toolsMockWebhookLogData, {
        timezone: process.env.TZ,
      }),
    );

    return true;
  }
}
