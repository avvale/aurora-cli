import { MessageIInboxRepository } from '@app/message/inbox';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageCountInboxService {
  constructor(private readonly repository: MessageIInboxRepository) {}

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
