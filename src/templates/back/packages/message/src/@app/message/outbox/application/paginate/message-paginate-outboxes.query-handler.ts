import { MessagePaginateOutboxesQuery } from '@app/message/outbox';
import { MessagePaginateOutboxesService } from '@app/message/outbox/application/paginate/message-paginate-outboxes.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessagePaginateOutboxesQuery)
export class MessagePaginateOutboxesQueryHandler
    implements IQueryHandler<MessagePaginateOutboxesQuery>
{
    constructor(
        private readonly paginateOutboxesService: MessagePaginateOutboxesService,
    ) {}

    async execute(
        query: MessagePaginateOutboxesQuery,
    ): Promise<PaginationResponse> {
        const { total, count, rows } = await this.paginateOutboxesService.main(
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
