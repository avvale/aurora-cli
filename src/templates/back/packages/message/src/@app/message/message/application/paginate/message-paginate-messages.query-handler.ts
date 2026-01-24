import { MessagePaginateMessagesQuery } from '@app/message/message';
import { MessagePaginateMessagesService } from '@app/message/message/application/paginate/message-paginate-messages.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessagePaginateMessagesQuery)
export class MessagePaginateMessagesQueryHandler
  implements IQueryHandler<MessagePaginateMessagesQuery>
{
  constructor(
    private readonly paginateMessagesService: MessagePaginateMessagesService,
  ) {}

  async execute(
    query: MessagePaginateMessagesQuery,
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
