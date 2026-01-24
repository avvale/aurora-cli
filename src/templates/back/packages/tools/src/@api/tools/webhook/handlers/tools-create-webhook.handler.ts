import { ToolsCreateWebhookInput, ToolsWebhook } from '@api/graphql';
import { ToolsCreateWebhookDto, ToolsWebhookDto } from '@api/tools/webhook';
import {
  ToolsCreateWebhookCommand,
  ToolsFindWebhookByIdQuery,
} from '@app/tools/webhook';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsCreateWebhookHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: ToolsCreateWebhookInput | ToolsCreateWebhookDto,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<ToolsWebhook | ToolsWebhookDto> {
    await this.commandBus.dispatch(
      new ToolsCreateWebhookCommand(payload, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return await this.queryBus.ask(
      new ToolsFindWebhookByIdQuery(
        payload.id,
        {},
        {
          timezone,
        },
      ),
    );
  }
}
