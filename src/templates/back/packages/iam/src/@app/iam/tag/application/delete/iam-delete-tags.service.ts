import { IamAddTagsContextEvent, IamITagRepository } from '@app/iam/tag';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamDeleteTagsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamITagRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const tags = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (tags.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddTagsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const tagsRegistered = this.publisher.mergeObjectContext(
            new IamAddTagsContextEvent(
                tags,
                cQMetadata,
            ),
        );

        tagsRegistered.deleted(); // apply event to model events
        tagsRegistered.commit(); // commit all events of model
    }
}
