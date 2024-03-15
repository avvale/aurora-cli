import { WhatsappPaginateConversationsQuery } from '@app/whatsapp/conversation';
import { WhatsappPaginateConversationsService } from '@app/whatsapp/conversation/application/paginate/whatsapp-paginate-conversations.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(WhatsappPaginateConversationsQuery)
export class WhatsappPaginateConversationsQueryHandler implements IQueryHandler<WhatsappPaginateConversationsQuery>
{
    constructor(
        private readonly paginateConversationsService: WhatsappPaginateConversationsService,
    ) {}

    async execute(query: WhatsappPaginateConversationsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateConversationsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO()),
        );
    }
}
