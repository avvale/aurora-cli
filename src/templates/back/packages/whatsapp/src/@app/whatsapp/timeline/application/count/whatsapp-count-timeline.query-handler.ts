import { WhatsappCountTimelineQuery } from '@app/whatsapp/timeline';
import { WhatsappCountTimelineService } from '@app/whatsapp/timeline/application/count/whatsapp-count-timeline.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappCountTimelineQuery)
export class WhatsappCountTimelineQueryHandler implements IQueryHandler<WhatsappCountTimelineQuery>
{
    constructor(
        private readonly countTimelineService: WhatsappCountTimelineService,
    ) {}

    async execute(query: WhatsappCountTimelineQuery): Promise<number>
    {
        return await this.countTimelineService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
