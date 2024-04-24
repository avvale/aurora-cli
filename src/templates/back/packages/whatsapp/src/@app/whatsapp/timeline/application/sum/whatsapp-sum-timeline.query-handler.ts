import { WhatsappSumTimelineQuery } from '@app/whatsapp/timeline';
import { WhatsappSumTimelineService } from '@app/whatsapp/timeline/application/sum/whatsapp-sum-timeline.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappSumTimelineQuery)
export class WhatsappSumTimelineQueryHandler implements IQueryHandler<WhatsappSumTimelineQuery>
{
    constructor(
        private readonly sumTimelineService: WhatsappSumTimelineService,
    ) {}

    async execute(query: WhatsappSumTimelineQuery): Promise<number>
    {
        return await this.sumTimelineService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
