import { MessagePaginateInboxSettingsQuery } from '@app/message/inbox-setting';
import { MessagePaginateInboxSettingsService } from '@app/message/inbox-setting/application/paginate/message-paginate-inbox-settings.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(MessagePaginateInboxSettingsQuery)
export class MessagePaginateInboxSettingsQueryHandler
    implements IQueryHandler<MessagePaginateInboxSettingsQuery>
{
    constructor(
        private readonly paginateInboxSettingsService: MessagePaginateInboxSettingsService,
    ) {}

    async execute(
        query: MessagePaginateInboxSettingsQuery,
    ): Promise<PaginationResponse> {
        const { total, count, rows } =
            await this.paginateInboxSettingsService.main(
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
