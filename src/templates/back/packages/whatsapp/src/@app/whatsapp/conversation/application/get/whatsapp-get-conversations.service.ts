import {
  WhatsappConversation,
  WhatsappIConversationRepository,
} from '@app/whatsapp/conversation';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappGetConversationsService {
  constructor(private readonly repository: WhatsappIConversationRepository) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<WhatsappConversation[]> {
    return await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
