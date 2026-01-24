import { ToolsCreateWebhookLogInput } from '@api/graphql';
import { ToolsCreateWebhookLogsCommand } from '@app/tools/webhook-log';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsCreateWebhookLogsHandler {
  constructor(private readonly commandBus: ICommandBus) {}

  async main(
    payload: ToolsCreateWebhookLogInput[],
    timezone?: string,
  ): Promise<boolean> {
    await this.commandBus.dispatch(
      new ToolsCreateWebhookLogsCommand(payload, {
        timezone,
      }),
    );

    return true;
  }
}
