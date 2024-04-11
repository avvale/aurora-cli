import { MessageAddInboxSettingsContextEvent, MessageIInboxSettingRepository, MessageInboxSetting } from '@app/message/inbox-setting';
import {
    MessageInboxSettingAccountId,
    MessageInboxSettingCreatedAt,
    MessageInboxSettingDeletedAt,
    MessageInboxSettingId,
    MessageInboxSettingSort,
    MessageInboxSettingUpdatedAt,
} from '@app/message/inbox-setting/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class MessageCreateInboxSettingsService
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
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateInboxSettings = payload.map(inboxSetting => MessageInboxSetting.register(
            inboxSetting.id,
            inboxSetting.accountId,
            inboxSetting.sort,
            new MessageInboxSettingCreatedAt({ currentTimestamp: true }),
            new MessageInboxSettingUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateInboxSettings,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddInboxSettingsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const inboxSettingsRegistered = this.publisher.mergeObjectContext(new MessageAddInboxSettingsContextEvent(aggregateInboxSettings));

        inboxSettingsRegistered.created(); // apply event to model events
        inboxSettingsRegistered.commit(); // commit all events of model
    }
}
