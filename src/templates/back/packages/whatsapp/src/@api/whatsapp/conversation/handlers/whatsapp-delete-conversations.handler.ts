import { WhatsappConversation } from '@api/graphql';
import { WhatsappConversationDto } from '@api/whatsapp/conversation';
import {
  WhatsappDeleteConversationsCommand,
  WhatsappGetConversationsQuery,
} from '@app/whatsapp/conversation';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappDeleteConversationsHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<WhatsappConversation[] | WhatsappConversationDto[]> {
    const conversations = await this.queryBus.ask(
      new WhatsappGetConversationsQuery(queryStatement, constraint, {
        timezone,
      }),
    );

    await this.commandBus.dispatch(
      new WhatsappDeleteConversationsCommand(queryStatement, constraint, {
        timezone,
      }),
    );

    return conversations;
  }
}
