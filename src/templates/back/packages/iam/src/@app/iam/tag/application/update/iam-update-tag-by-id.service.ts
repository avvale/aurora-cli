import { IamITagRepository, IamTag } from '@app/iam/tag';
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
export class IamUpdateTagByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamITagRepository,
    ) {}

    async main(
        payload: {
            id: IamTagId;
            name?: IamTagName;
        },
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

        // update by id
        await this.repository.updateById(
            tag,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const tagRegister = this.publisher.mergeObjectContext(
            tag,
        );

        tagRegister.updated({
            payload: tag,
            cQMetadata,
        }); // apply event to model events
        tagRegister.commit(); // commit all events of model
    }
}
