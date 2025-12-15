import {
    ToolsFindWebhookLogByIdQuery,
    ToolsWebhookLogMapper,
    ToolsWebhookLogResponse,
} from '@app/tools/webhook-log';
import { ToolsFindWebhookLogByIdService } from '@app/tools/webhook-log/application/find/tools-find-webhook-log-by-id.service';
import { ToolsWebhookLogId } from '@app/tools/webhook-log/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(ToolsFindWebhookLogByIdQuery)
export class ToolsFindWebhookLogByIdQueryHandler
    implements IQueryHandler<ToolsFindWebhookLogByIdQuery>
{
    private readonly mapper: ToolsWebhookLogMapper =
        new ToolsWebhookLogMapper();

    constructor(
        private readonly findWebhookLogByIdService: ToolsFindWebhookLogByIdService,
    ) {}

    async execute(
        query: ToolsFindWebhookLogByIdQuery,
    ): Promise<ToolsWebhookLogResponse> {
        const webhookLog = await this.findWebhookLogByIdService.main(
            new ToolsWebhookLogId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(webhookLog);
    }
}
