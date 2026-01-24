import {
  WhatsappConversation,
  WhatsappIConversationRepository,
} from '@app/whatsapp/conversation';
import { CQMetadata, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappPaginateConversationsService {
  constructor(private readonly repository: WhatsappIConversationRepository) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<Pagination<WhatsappConversation>> {
    return await this.repository.paginate({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
