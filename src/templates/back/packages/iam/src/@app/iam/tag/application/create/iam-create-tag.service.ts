import { IamITagRepository, IamTag } from '@app/iam/tag';
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
export class IamCreateTagService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamITagRepository,
    ) {}

    async main(
        payload: {
            id: IamTagId;
            name: IamTagName;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const tag = IamTag.register(
            payload.id,
            payload.name,
            new IamTagCreatedAt({ currentTimestamp: true }),
            new IamTagUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(
            tag,
            {
                createOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const tagRegister = this.publisher.mergeObjectContext(
            tag,
        );

        tagRegister.created(tag); // apply event to model events
        tagRegister.commit(); // commit all events of model
    }
}
