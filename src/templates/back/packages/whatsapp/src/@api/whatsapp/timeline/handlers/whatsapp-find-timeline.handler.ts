import { WhatsappTimeline } from '@api/graphql';
import { WhatsappTimelineDto } from '@api/whatsapp/timeline';
import { WhatsappFindTimelineQuery } from '@app/whatsapp/timeline';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappFindTimelineHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<WhatsappTimeline | WhatsappTimelineDto> {
    return await this.queryBus.ask(
      new WhatsappFindTimelineQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
