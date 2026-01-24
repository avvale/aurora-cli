import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//
import {
  WhatsappCreateConversationsCommand,
  whatsappMockConversationData,
} from '@app/whatsapp/conversation';

@Injectable()
export class WhatsappConversationSeeder {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(): Promise<boolean> {
    await this.commandBus.dispatch(
      new WhatsappCreateConversationsCommand(whatsappMockConversationData, {
        timezone: process.env.TZ,
      }),
    );

    return true;
  }
}
