import { MessagePaginateInboxesQuery } from '@app/message/inbox';
import { MessagePaginateInboxesService } from '@app/message/inbox/application/paginate/message-paginate-inboxes.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessagePaginateInboxesQuery)
export class MessagePaginateInboxesQueryHandler
  implements IQueryHandler<MessagePaginateInboxesQuery>
{
  constructor(
    private readonly paginateInboxesService: MessagePaginateInboxesService,
  ) {}

  async execute(
    query: MessagePaginateInboxesQuery,
  ): Promise<PaginationResponse> {
    const { total, count, rows } = await this.paginateInboxesService.main(
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
