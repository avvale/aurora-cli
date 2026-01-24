import {
  WhatsappConversation,
  WhatsappUpdateConversationsInput,
} from '@api/graphql';
import {
  WhatsappConversationDto,
  WhatsappUpdateConversationsDto,
} from '@api/whatsapp/conversation';
import {
  WhatsappGetConversationsQuery,
  WhatsappUpdateConversationsCommand,
} from '@app/whatsapp/conversation';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappUpdateConversationsHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: WhatsappUpdateConversationsInput | WhatsappUpdateConversationsDto,
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<WhatsappConversation | WhatsappConversationDto> {
    await this.commandBus.dispatch(
      new WhatsappUpdateConversationsCommand(
        payload,
        queryStatement,
        constraint,
        {
          timezone,
        },
      ),
    );

    return await this.queryBus.ask(
      new WhatsappGetConversationsQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
