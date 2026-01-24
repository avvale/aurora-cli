import { MessageInbox } from '@api/graphql';
import { IamAccountResponse } from '@app/iam/account';
import { MessageDeleteInboxByIdCommand } from '@app/message/inbox/application/delete/message-delete-inbox-by-id.command';
import { MessageFindInboxByIdQuery } from '@app/message/inbox/application/find/message-find-inbox-by-id.query';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { MessageInboxDto } from '../dto';

@Injectable()
export class MessageDeleteCustomerMessageInboxHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    account: IamAccountResponse,
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<MessageInbox | MessageInboxDto> {
    const inbox = await this.queryBus.ask(
      new MessageFindInboxByIdQuery(
        id,
        {
          ...constraint,
          where: {
            ...constraint.where,
            accountId: account.id,
          },
        },
        {
          timezone,
        },
      ),
    );

    await this.commandBus.dispatch(
      new MessageDeleteInboxByIdCommand(
        id,
        {
          ...constraint,
          where: {
            ...constraint.where,
            accountId: account.id,
          },
        },
        {
          timezone,
          repositoryOptions: {
            auditing,
          },
        },
      ),
    );

    return inbox;
  }
}
