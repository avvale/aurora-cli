import { WhatsappTimeline } from '@api/graphql';
import { WhatsappTimelineDto } from '@api/whatsapp/timeline';
import {
  WhatsappDeleteTimelineByIdCommand,
  WhatsappFindTimelineByIdQuery,
} from '@app/whatsapp/timeline';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappDeleteTimelineByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<WhatsappTimeline | WhatsappTimelineDto> {
    const timeline = await this.queryBus.ask(
      new WhatsappFindTimelineByIdQuery(id, constraint, {
        timezone,
      }),
    );

    await this.commandBus.dispatch(
      new WhatsappDeleteTimelineByIdCommand(id, constraint, {
        timezone,
      }),
    );

    return timeline;
  }
}
