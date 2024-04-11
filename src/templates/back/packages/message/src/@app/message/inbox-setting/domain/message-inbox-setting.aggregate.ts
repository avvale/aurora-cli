/* eslint-disable key-spacing */
import { MessageCreatedInboxSettingEvent, MessageDeletedInboxSettingEvent, MessageUpdatedInboxSettingEvent } from '@app/message/inbox-setting';
import {
    MessageInboxSettingAccountId,
    MessageInboxSettingCreatedAt,
    MessageInboxSettingDeletedAt,
    MessageInboxSettingId,
    MessageInboxSettingSort,
    MessageInboxSettingUpdatedAt,
} from '@app/message/inbox-setting/domain/value-objects';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class MessageInboxSetting extends AggregateRoot
{
    id: MessageInboxSettingId;
    accountId: MessageInboxSettingAccountId;
    sort: MessageInboxSettingSort;
    createdAt: MessageInboxSettingCreatedAt;
    updatedAt: MessageInboxSettingUpdatedAt;
    deletedAt: MessageInboxSettingDeletedAt;

    constructor(
        id: MessageInboxSettingId,
        accountId: MessageInboxSettingAccountId,
        sort: MessageInboxSettingSort,
        createdAt: MessageInboxSettingCreatedAt,
        updatedAt: MessageInboxSettingUpdatedAt,
        deletedAt: MessageInboxSettingDeletedAt,
    )
    {
        super();
        this.id = id;
        this.accountId = accountId;
        this.sort = sort;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    static register(
        id: MessageInboxSettingId,
        accountId: MessageInboxSettingAccountId,
        sort: MessageInboxSettingSort,
        createdAt: MessageInboxSettingCreatedAt,
        updatedAt: MessageInboxSettingUpdatedAt,
        deletedAt: MessageInboxSettingDeletedAt,
    ): MessageInboxSetting
    {
        return new MessageInboxSetting(
            id,
            accountId,
            sort,
            createdAt,
            updatedAt,
            deletedAt,
        );
    }

    created(inboxSetting: MessageInboxSetting): void
    {
        this.apply(
            new MessageCreatedInboxSettingEvent(
                inboxSetting.id.value,
                inboxSetting.accountId.value,
                inboxSetting.sort.value,
                inboxSetting.createdAt?.value,
                inboxSetting.updatedAt?.value,
                inboxSetting.deletedAt?.value,
            ),
        );
    }

    updated(inboxSetting: MessageInboxSetting): void
    {
        this.apply(
            new MessageUpdatedInboxSettingEvent(
                inboxSetting.id?.value,
                inboxSetting.accountId?.value,
                inboxSetting.sort?.value,
                inboxSetting.createdAt?.value,
                inboxSetting.updatedAt?.value,
                inboxSetting.deletedAt?.value,
            ),
        );
    }

    deleted(inboxSetting: MessageInboxSetting): void
    {
        this.apply(
            new MessageDeletedInboxSettingEvent(
                inboxSetting.id.value,
                inboxSetting.accountId.value,
                inboxSetting.sort.value,
                inboxSetting.createdAt?.value,
                inboxSetting.updatedAt?.value,
                inboxSetting.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            accountId: this.accountId.value,
            sort: this.sort.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            accountId: this.accountId.value,
            sort: this.sort.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }
}
