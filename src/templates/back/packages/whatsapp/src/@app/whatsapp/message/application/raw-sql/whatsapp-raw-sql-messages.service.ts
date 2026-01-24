import {
  WhatsappIMessageRepository,
  WhatsappMessage,
} from '@app/whatsapp/message';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappRawSQLMessagesService {
  constructor(private readonly repository: WhatsappIMessageRepository) {}

  async main(
    rawSQL?: string,
    cQMetadata?: CQMetadata,
  ): Promise<WhatsappMessage[]> {
    return await this.repository.rawSQL({
      rawSQL,
      cQMetadata,
    });
  }
}
