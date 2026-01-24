import {
  WhatsappITimelineRepository,
  WhatsappTimeline,
} from '@app/whatsapp/timeline';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappFindTimelineService {
  constructor(private readonly repository: WhatsappITimelineRepository) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<WhatsappTimeline> {
    return await this.repository.find({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
