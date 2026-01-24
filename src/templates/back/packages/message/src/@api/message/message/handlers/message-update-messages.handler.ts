import { MessageMessage, MessageUpdateMessagesInput } from '@api/graphql';
import {
  MessageMessageDto,
  MessageUpdateMessagesDto,
} from '@api/message/message';
import { IamAccountResponse } from '@app/iam/account';
import {
  MessageGetMessagesQuery,
  MessageUpdateMessagesCommand,
} from '@app/message/message';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageUpdateMessagesHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    account: IamAccountResponse,
    payload: MessageUpdateMessagesInput | MessageUpdateMessagesDto,
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<MessageMessage | MessageMessageDto> {
    await this.commandBus.dispatch(
      new MessageUpdateMessagesCommand(payload, queryStatement, constraint, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return await this.queryBus.ask(
      new MessageGetMessagesQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
