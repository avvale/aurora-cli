import { ToolsUpdateWebhookByIdInput, ToolsWebhook } from '@api/graphql';
import { ToolsUpdateWebhookByIdDto, ToolsWebhookDto } from '@api/tools/webhook';
import {
  ToolsFindWebhookByIdQuery,
  ToolsUpdateWebhookByIdCommand,
} from '@app/tools/webhook';
import {
  AuditingMeta,
  diff,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsUpdateWebhookByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: ToolsUpdateWebhookByIdInput | ToolsUpdateWebhookByIdDto,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<ToolsWebhook | ToolsWebhookDto> {
    const webhook = await this.queryBus.ask(
      new ToolsFindWebhookByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );

    const dataToUpdate = diff(payload, webhook);

    await this.commandBus.dispatch(
      new ToolsUpdateWebhookByIdCommand(
        {
          ...dataToUpdate,
          id: payload.id,
        },
        constraint,
        {
          timezone,
          repositoryOptions: {
            auditing,
          },
        },
      ),
    );

    return await this.queryBus.ask(
      new ToolsFindWebhookByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );
  }
}
