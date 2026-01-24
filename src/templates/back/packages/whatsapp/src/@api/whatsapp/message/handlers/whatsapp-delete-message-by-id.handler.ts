import { WhatsappMessage } from '@api/graphql';
import { WhatsappMessageDto } from '@api/whatsapp/message';
import {
  WhatsappDeleteMessageByIdCommand,
  WhatsappFindMessageByIdQuery,
} from '@app/whatsapp/message';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappDeleteMessageByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<WhatsappMessage | WhatsappMessageDto> {
    const message = await this.queryBus.ask(
      new WhatsappFindMessageByIdQuery(id, constraint, {
        timezone,
      }),
    );

    await this.commandBus.dispatch(
      new WhatsappDeleteMessageByIdCommand(id, constraint, {
        timezone,
      }),
    );

    return message;
  }
}
