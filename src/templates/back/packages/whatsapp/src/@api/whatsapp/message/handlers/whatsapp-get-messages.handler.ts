import { WhatsappMessage } from '@api/graphql';
import { WhatsappMessageDto } from '@api/whatsapp/message';
import { WhatsappGetMessagesQuery } from '@app/whatsapp/message';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappGetMessagesHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<WhatsappMessage[] | WhatsappMessageDto[]> {
    return await this.queryBus.ask(
      new WhatsappGetMessagesQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
