import { CommonAttachmentDto } from '@api/common/attachment';
import { CommonAttachment } from '@api/graphql';
import {
  CommonDeleteAttachmentsCommand,
  CommonGetAttachmentsQuery,
} from '@app/common/attachment';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonDeleteAttachmentsHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<CommonAttachment[] | CommonAttachmentDto[]> {
    const attachments = await this.queryBus.ask(
      new CommonGetAttachmentsQuery(queryStatement, constraint, {
        timezone,
      }),
    );

    await this.commandBus.dispatch(
      new CommonDeleteAttachmentsCommand(queryStatement, constraint, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return attachments;
  }
}
