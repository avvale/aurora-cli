import { ToolsWebhook } from '@api/graphql';
import { ToolsWebhookDto } from '@api/tools/webhook';
import {
  ToolsDeleteWebhookByIdCommand,
  ToolsFindWebhookByIdQuery,
} from '@app/tools/webhook';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsDeleteWebhookByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<ToolsWebhook | ToolsWebhookDto> {
    const webhook = await this.queryBus.ask(
      new ToolsFindWebhookByIdQuery(id, constraint, {
        timezone,
      }),
    );

    await this.commandBus.dispatch(
      new ToolsDeleteWebhookByIdCommand(id, constraint, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return webhook;
  }
}
