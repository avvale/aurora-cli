import { WhatsappGetTimelinesQuery, WhatsappTimelineMapper, WhatsappTimelineResponse } from '@app/whatsapp/timeline';
import { WhatsappGetTimelinesService } from '@app/whatsapp/timeline/application/get/whatsapp-get-timelines.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappGetTimelinesQuery)
export class WhatsappGetTimelinesQueryHandler implements IQueryHandler<WhatsappGetTimelinesQuery>
{
    private readonly mapper: WhatsappTimelineMapper = new WhatsappTimelineMapper();

    constructor(
        private readonly getTimelinesService: WhatsappGetTimelinesService,
    ) {}

    async execute(query: WhatsappGetTimelinesQuery): Promise<WhatsappTimelineResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getTimelinesService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}
