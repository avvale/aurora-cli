import { ToolsPaginateWebhookLogsQuery } from '@app/tools/webhook-log';
import { ToolsPaginateWebhookLogsService } from '@app/tools/webhook-log/application/paginate/tools-paginate-webhook-logs.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(ToolsPaginateWebhookLogsQuery)
export class ToolsPaginateWebhookLogsQueryHandler
    implements IQueryHandler<ToolsPaginateWebhookLogsQuery>
{
    constructor(
        private readonly paginateWebhookLogsService: ToolsPaginateWebhookLogsService,
    ) {}

    async execute(
        query: ToolsPaginateWebhookLogsQuery,
    ): Promise<PaginationResponse> {
        const { total, count, rows } =
            await this.paginateWebhookLogsService.main(
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
