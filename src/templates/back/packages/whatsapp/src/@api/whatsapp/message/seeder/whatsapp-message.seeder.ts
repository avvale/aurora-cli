import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//
import {
  WhatsappCreateMessagesCommand,
  whatsappMockMessageData,
} from '@app/whatsapp/message';

@Injectable()
export class WhatsappMessageSeeder {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(): Promise<boolean> {
    await this.commandBus.dispatch(
      new WhatsappCreateMessagesCommand(whatsappMockMessageData, {
        timezone: process.env.TZ,
      }),
    );

    return true;
  }
}
