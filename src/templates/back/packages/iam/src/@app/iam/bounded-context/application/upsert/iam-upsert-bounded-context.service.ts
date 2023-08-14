import { IamBoundedContext, IamIBoundedContextRepository } from '@app/iam/bounded-context';
import {
    IamBoundedContextCreatedAt,
    IamBoundedContextDeletedAt,
    IamBoundedContextId,
    IamBoundedContextIsActive,
    IamBoundedContextName,
    IamBoundedContextRoot,
    IamBoundedContextSort,
    IamBoundedContextUpdatedAt,
} from '@app/iam/bounded-context/domain/value-objects';
import { CQMetadata, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamUpsertBoundedContextService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIBoundedContextRepository,
    ) {}

    async main(
        payload: {
            id: IamBoundedContextId;
            name: IamBoundedContextName;
            root: IamBoundedContextRoot;
            sort: IamBoundedContextSort;
            isActive: IamBoundedContextIsActive;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // upsert aggregate with factory pattern
        const boundedContext = IamBoundedContext.register(
            payload.id,
            payload.name,
            payload.root,
            payload.sort,
            payload.isActive,
            new IamBoundedContextCreatedAt({ currentTimestamp: true }),
            new IamBoundedContextUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository
            .upsert(
                boundedContext,
                {
                    upsertOptions: cQMetadata?.repositoryOptions,
                },
            );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const boundedContextRegister = this.publisher.mergeObjectContext(
            boundedContext,
        );

        boundedContextRegister.created(boundedContext); // apply event to model events
        boundedContextRegister.commit(); // commit all events of model
    }
}
