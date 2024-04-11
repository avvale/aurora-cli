import { MessageAddInboxesContextEvent, MessageIInboxRepository } from '@app/message/inbox';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class MessageDeleteInboxesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: MessageIInboxRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const inboxes = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (inboxes.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddInboxesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const inboxesRegistered = this.publisher.mergeObjectContext(
            new MessageAddInboxesContextEvent(inboxes),
        );

        inboxesRegistered.deleted(); // apply event to model events
        inboxesRegistered.commit(); // commit all events of model
    }
}
