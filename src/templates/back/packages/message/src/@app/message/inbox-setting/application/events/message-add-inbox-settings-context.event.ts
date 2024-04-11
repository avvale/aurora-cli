import { MessageCreatedInboxSettingEvent, MessageCreatedInboxSettingsEvent, MessageDeletedInboxSettingEvent, MessageDeletedInboxSettingsEvent, MessageInboxSetting, MessageUpdatedAndIncrementedInboxSettingEvent, MessageUpdatedAndIncrementedInboxSettingsEvent, MessageUpdatedInboxSettingEvent, MessageUpdatedInboxSettingsEvent } from '@app/message/inbox-setting';
import { AggregateRoot } from '@nestjs/cqrs';

export class MessageAddInboxSettingsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: MessageInboxSetting[] = [],
    )
    {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void
    {
        this.apply(
            new MessageCreatedInboxSettingsEvent(
                this.aggregateRoots.map(inboxSetting =>
                    new MessageCreatedInboxSettingEvent(
                        inboxSetting.id.value,
                        inboxSetting.accountId.value,
                        inboxSetting.sort.value,
                        inboxSetting.createdAt?.value,
                        inboxSetting.updatedAt?.value,
                        inboxSetting.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new MessageUpdatedInboxSettingsEvent(
                this.aggregateRoots.map(inboxSetting =>
                    new MessageUpdatedInboxSettingEvent(
                        inboxSetting.id.value,
                        inboxSetting.accountId.value,
                        inboxSetting.sort.value,
                        inboxSetting.createdAt?.value,
                        inboxSetting.updatedAt?.value,
                        inboxSetting.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updatedAndIncremented(): void
    {
        this.apply(
            new MessageUpdatedAndIncrementedInboxSettingsEvent(
                this.aggregateRoots.map(inboxSetting =>
                    new MessageUpdatedAndIncrementedInboxSettingEvent(
                        inboxSetting.id.value,
                        inboxSetting.accountId.value,
                        inboxSetting.sort.value,
                        inboxSetting.createdAt?.value,
                        inboxSetting.updatedAt?.value,
                        inboxSetting.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new MessageDeletedInboxSettingsEvent(
                this.aggregateRoots.map(inboxSetting =>
                    new MessageDeletedInboxSettingEvent(
                        inboxSetting.id.value,
                        inboxSetting.accountId.value,
                        inboxSetting.sort.value,
                        inboxSetting.createdAt?.value,
                        inboxSetting.updatedAt?.value,
                        inboxSetting.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
