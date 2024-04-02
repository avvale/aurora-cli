import { IamAddTagsContextEvent, IamITagRepository, IamTag } from '@app/iam/tag';
import {
    IamTagCreatedAt,
    IamTagDeletedAt,
    IamTagId,
    IamTagName,
    IamTagUpdatedAt,
} from '@app/iam/tag/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamUpdateTagsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamITagRepository,
    ) {}

    async main(
        payload: {
            id?: IamTagId;
            name?: IamTagName;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const tag = IamTag.register(
            payload.id,
            payload.name,
            null, // createdAt
            new IamTagUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update
        await this.repository.update(
            tag,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const tags = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const tagsRegister = this.publisher.mergeObjectContext(
            new IamAddTagsContextEvent(tags),
        );

        tagsRegister.updated(); // apply event to model events
        tagsRegister.commit(); // commit all events of model
    }
}
