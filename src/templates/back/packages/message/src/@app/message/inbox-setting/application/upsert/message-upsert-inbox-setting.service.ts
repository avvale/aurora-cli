import { MessageIInboxSettingRepository, MessageInboxSetting } from '@app/message/inbox-setting';
import {
    MessageInboxSettingAccountId,
    MessageInboxSettingCreatedAt,
    MessageInboxSettingDeletedAt,
    MessageInboxSettingId,
    MessageInboxSettingSort,
    MessageInboxSettingUpdatedAt,
} from '@app/message/inbox-setting/domain/value-objects';
import { CQMetadata, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class MessageUpsertInboxSettingService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: MessageIInboxSettingRepository,
    ) {}

    async main(
        payload: {
            id: MessageInboxSettingId;
            accountId: MessageInboxSettingAccountId;
            sort: MessageInboxSettingSort;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // upsert aggregate with factory pattern
        const inboxSetting = MessageInboxSetting.register(
            payload.id,
            payload.accountId,
            payload.sort,
            new MessageInboxSettingCreatedAt({ currentTimestamp: true }),
            new MessageInboxSettingUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository
            .upsert(
                inboxSetting,
                {
                    upsertOptions: cQMetadata?.repositoryOptions,
                },
            );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const inboxSettingRegister = this.publisher.mergeObjectContext(
            inboxSetting,
        );

        inboxSettingRegister.created(inboxSetting); // apply event to model events
        inboxSettingRegister.commit(); // commit all events of model
    }
}
