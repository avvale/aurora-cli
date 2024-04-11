import { MessageMessageMapper } from '@app/message/message';
import { MessageOutbox, MessageOutboxResponse } from '@app/message/outbox';
import {
    MessageOutboxAccountRecipientIds,
    MessageOutboxCreatedAt,
    MessageOutboxDeletedAt,
    MessageOutboxId,
    MessageOutboxMessageId,
    MessageOutboxMeta,
    MessageOutboxScopeRecipients,
    MessageOutboxSort,
    MessageOutboxTagRecipients,
    MessageOutboxTenantRecipientIds,
    MessageOutboxUpdatedAt,
} from '@app/message/outbox/domain/value-objects';
import { CQMetadata, IMapper, LiteralObject, MapperOptions } from '@aurorajs.dev/core';

export class MessageOutboxMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param outbox
     */
    mapModelToAggregate(outbox: LiteralObject, cQMetadata?: CQMetadata): MessageOutbox
    {
        if (!outbox) return;

        return this.makeAggregate(outbox, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param outboxes
     */
    mapModelsToAggregates(outboxes: LiteralObject[], cQMetadata?: CQMetadata): MessageOutbox[]
    {
        if (!Array.isArray(outboxes)) return;

        return outboxes.map(outbox => this.makeAggregate(outbox, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param outbox
     */
    mapAggregateToResponse(outbox: MessageOutbox): MessageOutboxResponse
    {
        return this.makeResponse(outbox);
    }

    /**
     * Map array of aggregates to array responses
     * @param outboxes
     */
    mapAggregatesToResponses(outboxes: MessageOutbox[]): MessageOutboxResponse[]
    {
        if (!Array.isArray(outboxes)) return;

        return outboxes.map(outbox => this.makeResponse(outbox));
    }

    private makeAggregate(outbox: LiteralObject, cQMetadata?: CQMetadata): MessageOutbox
    {
        return MessageOutbox.register(
            new MessageOutboxId(outbox.id, { undefinable: true }),
            new MessageOutboxMessageId(outbox.messageId, { undefinable: true }),
            new MessageOutboxSort(outbox.sort, { undefinable: true }),
            new MessageOutboxAccountRecipientIds(outbox.accountRecipientIds, { undefinable: true }),
            new MessageOutboxTenantRecipientIds(outbox.tenantRecipientIds, { undefinable: true }),
            new MessageOutboxScopeRecipients(outbox.scopeRecipients, { undefinable: true }),
            new MessageOutboxTagRecipients(outbox.tagRecipients, { undefinable: true }),
            new MessageOutboxMeta(outbox.meta, { undefinable: true }),
            new MessageOutboxCreatedAt(outbox.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new MessageOutboxUpdatedAt(outbox.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new MessageOutboxDeletedAt(outbox.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new MessageMessageMapper({ eagerLoading: true }).mapModelToAggregate(outbox.message, cQMetadata) : undefined,
        );
    }

    private makeResponse(outbox: MessageOutbox): MessageOutboxResponse
    {
        if (!outbox) return;

        return new MessageOutboxResponse(
            outbox.id.value,
            outbox.messageId.value,
            outbox.sort.value,
            outbox.accountRecipientIds.value,
            outbox.tenantRecipientIds.value,
            outbox.scopeRecipients.value,
            outbox.tagRecipients.value,
            outbox.meta.value,
            outbox.createdAt.value,
            outbox.updatedAt.value,
            outbox.deletedAt.value,
            this.options.eagerLoading ? new MessageMessageMapper({ eagerLoading: true }).mapAggregateToResponse(outbox.message) : undefined,
        );
    }
}
