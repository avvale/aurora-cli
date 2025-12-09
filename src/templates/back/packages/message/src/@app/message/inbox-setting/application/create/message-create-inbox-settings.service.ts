import {
    MessageAddInboxSettingsContextEvent,
    MessageIInboxSettingRepository,
    MessageInboxSetting,
} from '@app/message/inbox-setting';
import {
    MessageInboxSettingAccountId,
    MessageInboxSettingCreatedAt,
    MessageInboxSettingId,
    MessageInboxSettingLastReadMessageRowId,
    MessageInboxSettingUpdatedAt,
} from '@app/message/inbox-setting/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class MessageCreateInboxSettingsService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: MessageIInboxSettingRepository,
    ) {}

    async main(
        payload: {
            id: MessageInboxSettingId;
            accountId: MessageInboxSettingAccountId;
            lastReadMessageRowId: MessageInboxSettingLastReadMessageRowId;
        }[],
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const inboxSettings = payload.map((inboxSetting) =>
            MessageInboxSetting.register(
                inboxSetting.id,
                undefined, // rowId
                inboxSetting.accountId,
                inboxSetting.lastReadMessageRowId,
                new MessageInboxSettingCreatedAt({ currentTimestamp: true }),
                new MessageInboxSettingUpdatedAt({ currentTimestamp: true }),
                null, // deleteAt
            ),
        );

        // insert
        await this.repository.insert(inboxSettings, {
            insertOptions: cQMetadata?.repositoryOptions,
        });

        // create AddInboxSettingsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const inboxSettingsRegistered = this.publisher.mergeObjectContext(
            new MessageAddInboxSettingsContextEvent(inboxSettings, cQMetadata),
        );

        inboxSettingsRegistered.created(); // apply event to model events
        inboxSettingsRegistered.commit(); // commit all events of model
    }
}
