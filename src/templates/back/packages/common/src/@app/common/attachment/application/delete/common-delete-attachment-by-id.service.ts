import { CommonIAttachmentRepository } from '@app/common/attachment';
import { CommonAttachmentId } from '@app/common/attachment/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonDeleteAttachmentByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonIAttachmentRepository,
    ) {}

    async main(
        id: CommonAttachmentId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const attachment = await this.repository
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
                attachment.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const attachmentRegister = this.publisher.mergeObjectContext(attachment);

        attachmentRegister.deleted(attachment); // apply event to model events
        attachmentRegister.commit(); // commit all events of model
    }
}
