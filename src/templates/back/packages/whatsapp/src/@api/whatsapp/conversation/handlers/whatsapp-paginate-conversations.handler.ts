import { Pagination } from '@api/graphql';
import { WhatsappPaginateConversationsQuery } from '@app/whatsapp/conversation';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappPaginateConversationsHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<Pagination> {
    return await this.queryBus.ask(
      new WhatsappPaginateConversationsQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
