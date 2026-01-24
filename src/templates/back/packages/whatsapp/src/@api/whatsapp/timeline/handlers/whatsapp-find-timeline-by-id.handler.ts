import { WhatsappTimeline } from '@api/graphql';
import { WhatsappTimelineDto } from '@api/whatsapp/timeline';
import { WhatsappFindTimelineByIdQuery } from '@app/whatsapp/timeline';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappFindTimelineByIdHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<WhatsappTimeline | WhatsappTimelineDto> {
    return await this.queryBus.ask(
      new WhatsappFindTimelineByIdQuery(id, constraint, {
        timezone,
      }),
    );
  }
}
