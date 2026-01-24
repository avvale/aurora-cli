import { WhatsappIConversationRepository } from '@app/whatsapp/conversation';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappSumConversationService {
  constructor(private readonly repository: WhatsappIConversationRepository) {}

  async main(
    column: string,
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<number> {
    return await this.repository.max(column, {
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
