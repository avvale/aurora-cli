import { ToolsWebhook, ToolsWebhookResponse } from '@app/tools/webhook';
import {
    ToolsWebhookCreatedAt,
    ToolsWebhookDeletedAt,
    ToolsWebhookEndpoint,
    ToolsWebhookEvents,
    ToolsWebhookExternalId,
    ToolsWebhookId,
    ToolsWebhookMeta,
    ToolsWebhookName,
    ToolsWebhookRowId,
    ToolsWebhookSecret,
    ToolsWebhookService,
    ToolsWebhookUpdatedAt,
} from '@app/tools/webhook/domain/value-objects';
import {
    CQMetadata,
    IMapper,
    LiteralObject,
    MapperOptions,
} from '@aurorajs.dev/core';

export class ToolsWebhookMapper implements IMapper {
    constructor(public options: MapperOptions = { eagerLoading: true }) {}

    /**
     * Map object to aggregate
     * @param webhook
     */
    mapModelToAggregate(
        webhook: LiteralObject,
        cQMetadata?: CQMetadata,
    ): ToolsWebhook {
        if (!webhook) return;

        return this.makeAggregate(webhook, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param webhooks
     */
    mapModelsToAggregates(
        webhooks: LiteralObject[],
        cQMetadata?: CQMetadata,
    ): ToolsWebhook[] {
        if (!Array.isArray(webhooks)) return;

        return webhooks.map((webhook) =>
            this.makeAggregate(webhook, cQMetadata),
        );
    }

    /**
     * Map aggregate to response
     * @param webhook
     */
    mapAggregateToResponse(webhook: ToolsWebhook): ToolsWebhookResponse {
        return this.makeResponse(webhook);
    }

    /**
     * Map array of aggregates to array responses
     * @param webhooks
     */
    mapAggregatesToResponses(webhooks: ToolsWebhook[]): ToolsWebhookResponse[] {
        if (!Array.isArray(webhooks)) return;

        return webhooks.map((webhook) => this.makeResponse(webhook));
    }

    private makeAggregate(
        webhook: LiteralObject,
        cQMetadata?: CQMetadata,
    ): ToolsWebhook {
        return ToolsWebhook.register(
            new ToolsWebhookId(webhook.id, { undefinable: true }),
            new ToolsWebhookRowId(webhook.rowId, { undefinable: true }),
            new ToolsWebhookName(webhook.name, { undefinable: true }),
            new ToolsWebhookService(webhook.service, { undefinable: true }),
            new ToolsWebhookEndpoint(webhook.endpoint, { undefinable: true }),
            new ToolsWebhookExternalId(webhook.externalId, {
                undefinable: true,
            }),
            new ToolsWebhookEvents(webhook.events, { undefinable: true }),
            new ToolsWebhookSecret(webhook.secret, { undefinable: true }),
            new ToolsWebhookMeta(webhook.meta, { undefinable: true }),
            new ToolsWebhookCreatedAt(
                webhook.createdAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            new ToolsWebhookUpdatedAt(
                webhook.updatedAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            new ToolsWebhookDeletedAt(
                webhook.deletedAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
        );
    }

    private makeResponse(webhook: ToolsWebhook): ToolsWebhookResponse {
        if (!webhook) return null;

        return new ToolsWebhookResponse(
            webhook.id.value,
            webhook.rowId.value,
            webhook.name.value,
            webhook.service.value,
            webhook.endpoint.value,
            webhook.externalId.value,
            webhook.events.value,
            webhook.secret.value,
            webhook.meta.value,
            webhook.createdAt.value,
            webhook.updatedAt.value,
            webhook.deletedAt.value,
        );
    }
}
