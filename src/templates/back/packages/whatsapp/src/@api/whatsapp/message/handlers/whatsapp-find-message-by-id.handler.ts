import { WhatsappMessage } from '@api/graphql';
import { WhatsappMessageDto } from '@api/whatsapp/message';
import { WhatsappFindMessageByIdQuery } from '@app/whatsapp/message';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappFindMessageByIdHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<WhatsappMessage | WhatsappMessageDto> {
    return await this.queryBus.ask(
      new WhatsappFindMessageByIdQuery(id, constraint, {
        timezone,
      }),
    );
  }
}
