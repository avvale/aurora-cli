import { MessageAddInboxSettingsContextEvent, MessageIInboxSettingRepository, MessageInboxSetting } from '@app/message/inbox-setting';
import {
    MessageInboxSettingAccountId,
    MessageInboxSettingCreatedAt,
    MessageInboxSettingDeletedAt,
    MessageInboxSettingId,
    MessageInboxSettingSort,
    MessageInboxSettingUpdatedAt,
} from '@app/message/inbox-setting/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class MessageUpdateInboxSettingsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: MessageIInboxSettingRepository,
    ) {}

    async main(
        payload: {
            id?: MessageInboxSettingId;
            accountId?: MessageInboxSettingAccountId;
            sort?: MessageInboxSettingSort;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const inboxSetting = MessageInboxSetting.register(
            payload.id,
            payload.accountId,
            payload.sort,
            null, // createdAt
            new MessageInboxSettingUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update
        await this.repository.update(
            inboxSetting,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const inboxSettings = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const inboxSettingsRegister = this.publisher.mergeObjectContext(
            new MessageAddInboxSettingsContextEvent(inboxSettings),
        );

        inboxSettingsRegister.updated(); // apply event to model events
        inboxSettingsRegister.commit(); // commit all events of model
    }
}
