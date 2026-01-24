import { ToolsWebhookLog } from '@api/graphql';
import { ToolsFindWebhookLogQuery } from '@app/tools/webhook-log';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ToolsFindWebhookLogHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<ToolsWebhookLog> {
    const webhookLog = await this.queryBus.ask(
      new ToolsFindWebhookLogQuery(queryStatement, constraint, {
        timezone,
      }),
    );

    if (!webhookLog) {
      throw new NotFoundException(`ToolsWebhookLog not found`);
    }

    return webhookLog;
  }
}
