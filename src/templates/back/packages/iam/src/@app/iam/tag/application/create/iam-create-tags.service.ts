import { IamAddTagsContextEvent, IamITagRepository, IamTag } from '@app/iam/tag';
import {
    IamTagCreatedAt,
    IamTagDeletedAt,
    IamTagId,
    IamTagName,
    IamTagUpdatedAt,
} from '@app/iam/tag/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamCreateTagsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamITagRepository,
    ) {}

    async main(
        payload: {
            id: IamTagId;
            name: IamTagName;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateTags = payload.map(tag => IamTag.register(
            tag.id,
            tag.name,
            new IamTagCreatedAt({ currentTimestamp: true }),
            new IamTagUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateTags,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddTagsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const tagsRegistered = this.publisher.mergeObjectContext(new IamAddTagsContextEvent(aggregateTags));

        tagsRegistered.created(); // apply event to model events
        tagsRegistered.commit(); // commit all events of model
    }
}
