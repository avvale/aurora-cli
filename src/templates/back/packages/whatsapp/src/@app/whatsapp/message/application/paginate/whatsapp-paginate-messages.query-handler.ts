import { WhatsappPaginateMessagesQuery } from '@app/whatsapp/message';
import { WhatsappPaginateMessagesService } from '@app/whatsapp/message/application/paginate/whatsapp-paginate-messages.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappPaginateMessagesQuery)
export class WhatsappPaginateMessagesQueryHandler
  implements IQueryHandler<WhatsappPaginateMessagesQuery>
{
  constructor(
    private readonly paginateMessagesService: WhatsappPaginateMessagesService,
  ) {}

  async execute(
    query: WhatsappPaginateMessagesQuery,
  ): Promise<PaginationResponse> {
    const { total, count, rows } = await this.paginateMessagesService.main(
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
