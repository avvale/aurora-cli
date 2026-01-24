import { ToolsWebhook } from '@api/graphql';
import { ToolsWebhookDto } from '@api/tools/webhook';
import { ToolsFindWebhookByIdQuery } from '@app/tools/webhook';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsFindWebhookByIdHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<ToolsWebhook | ToolsWebhookDto> {
    return await this.queryBus.ask(
      new ToolsFindWebhookByIdQuery(id, constraint, {
        timezone,
      }),
    );
  }
}
