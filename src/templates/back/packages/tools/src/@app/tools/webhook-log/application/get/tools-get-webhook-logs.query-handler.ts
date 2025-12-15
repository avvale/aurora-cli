import {
    ToolsGetWebhookLogsQuery,
    ToolsWebhookLog,
    ToolsWebhookLogMapper,
    ToolsWebhookLogResponse,
} from '@app/tools/webhook-log';
import { ToolsGetWebhookLogsService } from '@app/tools/webhook-log/application/get/tools-get-webhook-logs.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(ToolsGetWebhookLogsQuery)
export class ToolsGetWebhookLogsQueryHandler
    implements IQueryHandler<ToolsGetWebhookLogsQuery>
{
    private readonly mapper: ToolsWebhookLogMapper =
        new ToolsWebhookLogMapper();

    constructor(
        private readonly getWebhookLogsService: ToolsGetWebhookLogsService,
    ) {}

    async execute(
        query: ToolsGetWebhookLogsQuery,
    ): Promise<ToolsWebhookLogResponse[] | LiteralObject[]> {
        const models = await this.getWebhookLogsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        if (query.cQMetadata?.excludeMapModelToAggregate) return models;

        return this.mapper.mapAggregatesToResponses(
            models as ToolsWebhookLog[],
        );
    }
}
