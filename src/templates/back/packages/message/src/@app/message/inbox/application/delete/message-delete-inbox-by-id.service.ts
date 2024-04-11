import { MessageIInboxRepository } from '@app/message/inbox';
import { MessageInboxId } from '@app/message/inbox/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class MessageDeleteInboxByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: MessageIInboxRepository,
    ) {}

    async main(
        id: MessageInboxId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const inbox = await this.repository
            .findById(
                id,
                {
                    constraint,
                    cQMetadata,
                },
            );

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository
            .deleteById(
                inbox.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const inboxRegister = this.publisher.mergeObjectContext(inbox);

        inboxRegister.deleted(inbox); // apply event to model events
        inboxRegister.commit(); // commit all events of model
    }
}
