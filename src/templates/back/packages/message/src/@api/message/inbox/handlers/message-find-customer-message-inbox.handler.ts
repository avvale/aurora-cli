import { MessageInbox } from '@api/graphql';
import { IamAccountResponse } from '@app/iam/account';
import { MessageFindInboxQuery } from '@app/message/inbox';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MessageInboxDto } from '../dto';

@Injectable()
export class MessageFindCustomerMessageInboxHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    account: IamAccountResponse,
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<MessageInbox | MessageInboxDto> {
    if (!account)
      throw new UnauthorizedException(
        'You are not authorized to access messages',
      );

    return await this.queryBus.ask(
      new MessageFindInboxQuery(
        queryStatement,
        {
          ...constraint,
          where: {
            ...constraint?.where,
            accountId: account.id,
          },
        },
        {
          timezone,
        },
      ),
    );
  }
}
