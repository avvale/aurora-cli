import {
  WhatsappITimelineRepository,
  WhatsappTimeline,
} from '@app/whatsapp/timeline';
import { CQMetadata, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappPaginateTimelinesService {
  constructor(private readonly repository: WhatsappITimelineRepository) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<Pagination<WhatsappTimeline>> {
    return await this.repository.paginate({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
