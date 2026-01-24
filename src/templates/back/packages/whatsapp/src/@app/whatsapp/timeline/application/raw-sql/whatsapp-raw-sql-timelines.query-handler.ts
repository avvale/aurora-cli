import {
  WhatsappRawSQLTimelinesQuery,
  WhatsappTimelineMapper,
  WhatsappTimelineResponse,
} from '@app/whatsapp/timeline';
import { WhatsappRawSQLTimelinesService } from '@app/whatsapp/timeline/application/raw-sql/whatsapp-raw-sql-timelines.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappRawSQLTimelinesQuery)
export class WhatsappRawSQLTimelinesQueryHandler
  implements IQueryHandler<WhatsappRawSQLTimelinesQuery>
{
  private readonly mapper: WhatsappTimelineMapper =
    new WhatsappTimelineMapper();

  constructor(
    private readonly rawSQLTimelinesService: WhatsappRawSQLTimelinesService,
  ) {}

  async execute(
    query: WhatsappRawSQLTimelinesQuery,
  ): Promise<WhatsappTimelineResponse[]> {
    return this.mapper.mapAggregatesToResponses(
      await this.rawSQLTimelinesService.main(query.rawSQL, query.cQMetadata),
    );
  }
}
