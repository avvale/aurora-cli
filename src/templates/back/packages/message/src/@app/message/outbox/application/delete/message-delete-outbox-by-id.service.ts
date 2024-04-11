import { MessageIOutboxRepository } from '@app/message/outbox';
import { MessageOutboxId } from '@app/message/outbox/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class MessageDeleteOutboxByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: MessageIOutboxRepository,
    ) {}

    async main(
        id: MessageOutboxId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const outbox = await this.repository
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
                outbox.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const outboxRegister = this.publisher.mergeObjectContext(outbox);

        outboxRegister.deleted(outbox); // apply event to model events
        outboxRegister.commit(); // commit all events of model
    }
}
