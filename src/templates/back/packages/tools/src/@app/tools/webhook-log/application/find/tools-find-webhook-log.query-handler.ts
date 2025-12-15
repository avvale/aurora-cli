import {
    ToolsFindWebhookLogQuery,
    ToolsWebhookLogMapper,
    ToolsWebhookLogResponse,
} from '@app/tools/webhook-log';
import { ToolsFindWebhookLogService } from '@app/tools/webhook-log/application/find/tools-find-webhook-log.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(ToolsFindWebhookLogQuery)
export class ToolsFindWebhookLogQueryHandler
    implements IQueryHandler<ToolsFindWebhookLogQuery>
{
    private readonly mapper: ToolsWebhookLogMapper =
        new ToolsWebhookLogMapper();

    constructor(
        private readonly findWebhookLogService: ToolsFindWebhookLogService,
    ) {}

    async execute(
        query: ToolsFindWebhookLogQuery,
    ): Promise<ToolsWebhookLogResponse> {
        const webhookLog = await this.findWebhookLogService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(webhookLog);
    }
}
