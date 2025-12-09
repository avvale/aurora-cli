import { ToolsPaginateWebhooksQuery } from '@app/tools/webhook';
import { ToolsPaginateWebhooksService } from '@app/tools/webhook/application/paginate/tools-paginate-webhooks.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(ToolsPaginateWebhooksQuery)
export class ToolsPaginateWebhooksQueryHandler
    implements IQueryHandler<ToolsPaginateWebhooksQuery>
{
    constructor(
        private readonly paginateWebhooksService: ToolsPaginateWebhooksService,
    ) {}

    async execute(
        query: ToolsPaginateWebhooksQuery,
    ): Promise<PaginationResponse> {
        const { total, count, rows } = await this.paginateWebhooksService.main(
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
