import { messageMockOutboxData, MessageOutbox } from '@app/message/outbox';
import {
    MessageOutboxAccountRecipientIds,
    MessageOutboxCreatedAt,
    MessageOutboxDeletedAt,
    MessageOutboxId,
    MessageOutboxMessageId,
    MessageOutboxMeta,
    MessageOutboxRowId,
    MessageOutboxScopeRecipients,
    MessageOutboxTagRecipients,
    MessageOutboxTenantRecipientIds,
    MessageOutboxUpdatedAt,
} from '@app/message/outbox/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class MessageMockOutboxSeeder extends MockSeeder<MessageOutbox> {
    public collectionSource: MessageOutbox[];

    constructor() {
        super();
        this._createMock();
    }

    private _createMock(): void {
        this.collectionSource = [];

        for (const outbox of _.orderBy(messageMockOutboxData, ['id'])) {
            this.collectionSource.push(
                MessageOutbox.register(
                    new MessageOutboxId(outbox.id),
                    new MessageOutboxRowId(outbox.rowId),
                    new MessageOutboxMessageId(outbox.messageId),
                    new MessageOutboxAccountRecipientIds(
                        outbox.accountRecipientIds,
                    ),
                    new MessageOutboxTenantRecipientIds(
                        outbox.tenantRecipientIds,
                    ),
                    new MessageOutboxScopeRecipients(outbox.scopeRecipients),
                    new MessageOutboxTagRecipients(outbox.tagRecipients),
                    new MessageOutboxMeta(outbox.meta),
                    new MessageOutboxCreatedAt({ currentTimestamp: true }),
                    new MessageOutboxUpdatedAt({ currentTimestamp: true }),
                    new MessageOutboxDeletedAt(null),
                ),
            );
        }
    }
}
