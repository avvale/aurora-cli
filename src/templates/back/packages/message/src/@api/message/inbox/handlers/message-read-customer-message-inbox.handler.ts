import { MessageUpdateInboxByIdInput } from '@api/graphql';
import { IamAccountResponse } from '@app/iam/account';
import {
  MessageFindInboxByIdQuery,
  MessageUpdateInboxByIdCommand,
} from '@app/message/inbox';
import { MessageUpdateAndIncrementMessagesCommand } from '@app/message/message';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { MessageUpdateInboxByIdDto } from '../dto';

@Injectable()
export class MessageReadCustomerMessageInboxHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    account: IamAccountResponse,
    inbox: MessageUpdateInboxByIdInput | MessageUpdateInboxByIdDto,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<boolean> {
    const currentInbox = await this.queryBus.ask(
      new MessageFindInboxByIdQuery(inbox.id, constraint, {
        timezone,
      }),
    );

    await this.commandBus.dispatch(
      new MessageUpdateInboxByIdCommand(
        {
          id: currentInbox.id,
          isRead: true,
          isReadAtLeastOnce: true,
        },
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

    if (!currentInbox.isReadAtLeastOnce) {
      await this.commandBus.dispatch(
        new MessageUpdateAndIncrementMessagesCommand(
          {
            reads: 1,
          },
          {
            ...constraint,
            where: {
              ...constraint.where,
              id: currentInbox.messageId,
            },
          },
        ),
      );
    }

    return true;
  }
}
