import { MessageAddInboxSettingsContextEvent, MessageIInboxSettingRepository } from '@app/message/inbox-setting';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class MessageDeleteInboxSettingsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: MessageIInboxSettingRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const inboxSettings = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (inboxSettings.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddInboxSettingsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const inboxSettingsRegistered = this.publisher.mergeObjectContext(
            new MessageAddInboxSettingsContextEvent(inboxSettings),
        );

        inboxSettingsRegistered.deleted(); // apply event to model events
        inboxSettingsRegistered.commit(); // commit all events of model
    }
}
