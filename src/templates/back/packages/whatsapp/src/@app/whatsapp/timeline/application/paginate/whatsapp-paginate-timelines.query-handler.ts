import { WhatsappPaginateTimelinesQuery } from '@app/whatsapp/timeline';
import { WhatsappPaginateTimelinesService } from '@app/whatsapp/timeline/application/paginate/whatsapp-paginate-timelines.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappPaginateTimelinesQuery)
export class WhatsappPaginateTimelinesQueryHandler
  implements IQueryHandler<WhatsappPaginateTimelinesQuery>
{
  constructor(
    private readonly paginateTimelinesService: WhatsappPaginateTimelinesService,
  ) {}

  async execute(
    query: WhatsappPaginateTimelinesQuery,
  ): Promise<PaginationResponse> {
    const { total, count, rows } = await this.paginateTimelinesService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    return new PaginationResponse(
      total,
      count,
      rows.map((item) => item.toDTO()),
    );
  }
}
