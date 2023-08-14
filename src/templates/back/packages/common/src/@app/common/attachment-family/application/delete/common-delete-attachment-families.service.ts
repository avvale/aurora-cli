import { CommonAddAttachmentFamiliesContextEvent, CommonIAttachmentFamilyRepository } from '@app/common/attachment-family';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonDeleteAttachmentFamiliesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonIAttachmentFamilyRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const attachmentFamilies = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (attachmentFamilies.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddAttachmentFamiliesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const attachmentFamiliesRegistered = this.publisher.mergeObjectContext(
            new CommonAddAttachmentFamiliesContextEvent(attachmentFamilies),
        );

        attachmentFamiliesRegistered.deleted(); // apply event to model events
        attachmentFamiliesRegistered.commit(); // commit all events of model
    }
}
