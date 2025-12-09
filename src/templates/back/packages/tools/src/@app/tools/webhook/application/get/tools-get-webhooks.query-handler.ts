import {
    ToolsGetWebhooksQuery,
    ToolsWebhook,
    ToolsWebhookMapper,
    ToolsWebhookResponse,
} from '@app/tools/webhook';
import { ToolsGetWebhooksService } from '@app/tools/webhook/application/get/tools-get-webhooks.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(ToolsGetWebhooksQuery)
export class ToolsGetWebhooksQueryHandler
    implements IQueryHandler<ToolsGetWebhooksQuery>
{
    private readonly mapper: ToolsWebhookMapper = new ToolsWebhookMapper();

    constructor(private readonly getWebhooksService: ToolsGetWebhooksService) {}

    async execute(
        query: ToolsGetWebhooksQuery,
    ): Promise<ToolsWebhookResponse[] | LiteralObject[]> {
        const models = await this.getWebhooksService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        if (query.cQMetadata?.excludeMapModelToAggregate) return models;

        return this.mapper.mapAggregatesToResponses(models as ToolsWebhook[]);
    }
}
