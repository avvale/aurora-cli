import {
  WhatsappFindTimelineByIdQuery,
  WhatsappTimelineMapper,
  WhatsappTimelineResponse,
} from '@app/whatsapp/timeline';
import { WhatsappFindTimelineByIdService } from '@app/whatsapp/timeline/application/find/whatsapp-find-timeline-by-id.service';
import { WhatsappTimelineId } from '@app/whatsapp/timeline/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappFindTimelineByIdQuery)
export class WhatsappFindTimelineByIdQueryHandler
  implements IQueryHandler<WhatsappFindTimelineByIdQuery>
{
  private readonly mapper: WhatsappTimelineMapper =
    new WhatsappTimelineMapper();

  constructor(
    private readonly findTimelineByIdService: WhatsappFindTimelineByIdService,
  ) {}

  async execute(
    query: WhatsappFindTimelineByIdQuery,
  ): Promise<WhatsappTimelineResponse> {
    const timeline = await this.findTimelineByIdService.main(
      new WhatsappTimelineId(query.id),
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(timeline);
  }
}
