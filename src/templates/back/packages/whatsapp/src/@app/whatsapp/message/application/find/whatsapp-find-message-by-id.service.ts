import {
  WhatsappIMessageRepository,
  WhatsappMessage,
} from '@app/whatsapp/message';
import { WhatsappMessageId } from '@app/whatsapp/message/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappFindMessageByIdService {
  constructor(private readonly repository: WhatsappIMessageRepository) {}

  async main(
    id: WhatsappMessageId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<WhatsappMessage> {
    return await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });
  }
}
