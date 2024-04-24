import { WhatsappMaxTimelineQuery } from '@app/whatsapp/timeline';
import { WhatsappMaxTimelineService } from '@app/whatsapp/timeline/application/max/whatsapp-max-timeline.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappMaxTimelineQuery)
export class WhatsappMaxTimelineQueryHandler implements IQueryHandler<WhatsappMaxTimelineQuery>
{
    constructor(
        private readonly maxTimelineService: WhatsappMaxTimelineService,
    ) {}

    async execute(query: WhatsappMaxTimelineQuery): Promise<number>
    {
        return await this.maxTimelineService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
