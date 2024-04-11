import { MessageIOutboxRepository, MessageOutbox } from '@app/message/outbox';
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
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class MessageUpdateOutboxByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: MessageIOutboxRepository,
    ) {}

    async main(
        payload: {
            id: MessageOutboxId;
            messageId?: MessageOutboxMessageId;
            sort?: MessageOutboxSort;
            accountRecipientIds?: MessageOutboxAccountRecipientIds;
            tenantRecipientIds?: MessageOutboxTenantRecipientIds;
            scopeRecipients?: MessageOutboxScopeRecipients;
            tagRecipients?: MessageOutboxTagRecipients;
            meta?: MessageOutboxMeta;
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const outbox = MessageOutbox.register(
            payload.id,
            payload.messageId,
            payload.sort,
            payload.accountRecipientIds,
            payload.tenantRecipientIds,
            payload.scopeRecipients,
            payload.tagRecipients,
            payload.meta,
            null, // createdAt
            new MessageOutboxUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update by id
        await this.repository.updateById(
            outbox,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const outboxRegister = this.publisher.mergeObjectContext(
            outbox,
        );

        outboxRegister.updated(outbox); // apply event to model events
        outboxRegister.commit(); // commit all events of model
    }
}
