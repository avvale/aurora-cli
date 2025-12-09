import {
    ToolsFindWebhookQuery,
    ToolsWebhookMapper,
    ToolsWebhookResponse,
} from '@app/tools/webhook';
import { ToolsFindWebhookService } from '@app/tools/webhook/application/find/tools-find-webhook.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(ToolsFindWebhookQuery)
export class ToolsFindWebhookQueryHandler
    implements IQueryHandler<ToolsFindWebhookQuery>
{
    private readonly mapper: ToolsWebhookMapper = new ToolsWebhookMapper();

    constructor(private readonly findWebhookService: ToolsFindWebhookService) {}

    async execute(query: ToolsFindWebhookQuery): Promise<ToolsWebhookResponse> {
        const webhook = await this.findWebhookService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(webhook);
    }
}
