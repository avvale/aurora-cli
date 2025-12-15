import {
    ToolsWebhookLog,
    ToolsWebhookLogResponse,
} from '@app/tools/webhook-log';
import {
    ToolsWebhookLogBodyRequest,
    ToolsWebhookLogCreatedAt,
    ToolsWebhookLogDeletedAt,
    ToolsWebhookLogHeaderRequest,
    ToolsWebhookLogId,
    ToolsWebhookLogRowId,
    ToolsWebhookLogUpdatedAt,
    ToolsWebhookLogUrl,
} from '@app/tools/webhook-log/domain/value-objects';
import {
    CQMetadata,
    IMapper,
    LiteralObject,
    MapperOptions,
} from '@aurorajs.dev/core';

export class ToolsWebhookLogMapper implements IMapper {
    constructor(public options: MapperOptions = { eagerLoading: true }) {}

    /**
     * Map object to aggregate
     * @param webhookLog
     */
    mapModelToAggregate(
        webhookLog: LiteralObject,
        cQMetadata?: CQMetadata,
    ): ToolsWebhookLog {
        if (!webhookLog) return;

        return this.makeAggregate(webhookLog, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param webhookLogs
     */
    mapModelsToAggregates(
        webhookLogs: LiteralObject[],
        cQMetadata?: CQMetadata,
    ): ToolsWebhookLog[] {
        if (!Array.isArray(webhookLogs)) return;

        return webhookLogs.map((webhookLog) =>
            this.makeAggregate(webhookLog, cQMetadata),
        );
    }

    /**
     * Map aggregate to response
     * @param webhookLog
     */
    mapAggregateToResponse(
        webhookLog: ToolsWebhookLog,
    ): ToolsWebhookLogResponse {
        return this.makeResponse(webhookLog);
    }

    /**
     * Map array of aggregates to array responses
     * @param webhookLogs
     */
    mapAggregatesToResponses(
        webhookLogs: ToolsWebhookLog[],
    ): ToolsWebhookLogResponse[] {
        if (!Array.isArray(webhookLogs)) return;

        return webhookLogs.map((webhookLog) => this.makeResponse(webhookLog));
    }

    private makeAggregate(
        webhookLog: LiteralObject,
        cQMetadata?: CQMetadata,
    ): ToolsWebhookLog {
        return ToolsWebhookLog.register(
            new ToolsWebhookLogId(webhookLog.id, { undefinable: true }),
            new ToolsWebhookLogRowId(webhookLog.rowId, { undefinable: true }),
            new ToolsWebhookLogUrl(webhookLog.url, { undefinable: true }),
            new ToolsWebhookLogHeaderRequest(webhookLog.headerRequest, {
                undefinable: true,
            }),
            new ToolsWebhookLogBodyRequest(webhookLog.bodyRequest, {
                undefinable: true,
            }),
            new ToolsWebhookLogCreatedAt(
                webhookLog.createdAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            new ToolsWebhookLogUpdatedAt(
                webhookLog.updatedAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            new ToolsWebhookLogDeletedAt(
                webhookLog.deletedAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
        );
    }

    private makeResponse(webhookLog: ToolsWebhookLog): ToolsWebhookLogResponse {
        if (!webhookLog) return null;

        return new ToolsWebhookLogResponse(
            webhookLog.id.value,
            webhookLog.rowId.value,
            webhookLog.url.value,
            webhookLog.headerRequest.value,
            webhookLog.bodyRequest.value,
            webhookLog.createdAt.value,
            webhookLog.updatedAt.value,
            webhookLog.deletedAt.value,
        );
    }
}
