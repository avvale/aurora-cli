import { WhatsappIMessageRepository } from '@app/whatsapp/message';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappCountMessageService {
  constructor(private readonly repository: WhatsappIMessageRepository) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<number> {
    return await this.repository.count({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
