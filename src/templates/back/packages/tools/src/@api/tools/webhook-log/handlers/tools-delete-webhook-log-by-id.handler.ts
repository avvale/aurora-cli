import { ToolsWebhookLog } from '@api/graphql';
import {
  ToolsDeleteWebhookLogByIdCommand,
  ToolsFindWebhookLogByIdQuery,
} from '@app/tools/webhook-log';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ToolsDeleteWebhookLogByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<ToolsWebhookLog> {
    const webhookLog = await this.queryBus.ask(
      new ToolsFindWebhookLogByIdQuery(id, constraint, {
        timezone,
      }),
    );

    if (!webhookLog) {
      throw new NotFoundException(`ToolsWebhookLog with id: ${id}, not found`);
    }

    await this.commandBus.dispatch(
      new ToolsDeleteWebhookLogByIdCommand(id, constraint, {
        timezone,
      }),
    );

    return webhookLog;
  }
}
