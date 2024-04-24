import { WhatsappFindTimelineQuery, WhatsappTimelineMapper, WhatsappTimelineResponse } from '@app/whatsapp/timeline';
import { WhatsappFindTimelineService } from '@app/whatsapp/timeline/application/find/whatsapp-find-timeline.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappFindTimelineQuery)
export class WhatsappFindTimelineQueryHandler implements IQueryHandler<WhatsappFindTimelineQuery>
{
    private readonly mapper: WhatsappTimelineMapper = new WhatsappTimelineMapper();

    constructor(
        private readonly findTimelineService: WhatsappFindTimelineService,
    ) {}

    async execute(query: WhatsappFindTimelineQuery): Promise<WhatsappTimelineResponse>
    {
        const timeline = await this.findTimelineService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(timeline);
    }
}
