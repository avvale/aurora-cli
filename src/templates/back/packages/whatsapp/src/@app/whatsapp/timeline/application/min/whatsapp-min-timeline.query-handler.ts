import { WhatsappMinTimelineQuery } from '@app/whatsapp/timeline';
import { WhatsappMinTimelineService } from '@app/whatsapp/timeline/application/min/whatsapp-min-timeline.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappMinTimelineQuery)
export class WhatsappMinTimelineQueryHandler implements IQueryHandler<WhatsappMinTimelineQuery>
{
    constructor(
        private readonly minTimelineService: WhatsappMinTimelineService,
    ) {}

    async execute(query: WhatsappMinTimelineQuery): Promise<number>
    {
        return await this.minTimelineService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
