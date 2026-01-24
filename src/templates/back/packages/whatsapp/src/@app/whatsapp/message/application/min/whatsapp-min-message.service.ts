import { WhatsappIMessageRepository } from '@app/whatsapp/message';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappMinMessageService {
  constructor(private readonly repository: WhatsappIMessageRepository) {}

  async main(
    column: string,
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<number> {
    return await this.repository.min(column, {
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
