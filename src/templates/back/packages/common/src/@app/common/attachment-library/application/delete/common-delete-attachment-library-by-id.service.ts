import { CommonIAttachmentLibraryRepository } from '@app/common/attachment-library';
import { CommonAttachmentLibraryId } from '@app/common/attachment-library/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonDeleteAttachmentLibraryByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonIAttachmentLibraryRepository,
    ) {}

    async main(
        id: CommonAttachmentLibraryId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const attachmentLibrary = await this.repository
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
                attachmentLibrary.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const attachmentLibraryRegister = this.publisher.mergeObjectContext(attachmentLibrary);

        attachmentLibraryRegister.deleted(attachmentLibrary); // apply event to model events
        attachmentLibraryRegister.commit(); // commit all events of model
    }
}
