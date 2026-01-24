import { MessageMessage } from '@api/graphql';
import { MessageMessageDto } from '@api/message/message';
import { IamAccountResponse } from '@app/iam/account';
import { MessageFindMessageByIdQuery } from '@app/message/message';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageFindMessageByIdHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    account: IamAccountResponse,
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<MessageMessage | MessageMessageDto> {
    return await this.queryBus.ask(
      new MessageFindMessageByIdQuery(id, constraint, {
        timezone,
      }),
    );
  }
}
