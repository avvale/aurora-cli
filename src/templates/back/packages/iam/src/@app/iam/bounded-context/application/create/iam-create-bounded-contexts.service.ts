import { IamAddBoundedContextsContextEvent, IamBoundedContext, IamIBoundedContextRepository } from '@app/iam/bounded-context';
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
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamCreateBoundedContextsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIBoundedContextRepository,
    ) {}

    async main(
        boundedContexts: {
            id: IamBoundedContextId;
            name: IamBoundedContextName;
            root: IamBoundedContextRoot;
            sort: IamBoundedContextSort;
            isActive: IamBoundedContextIsActive;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateBoundedContexts = boundedContexts.map(boundedContext => IamBoundedContext.register(
            boundedContext.id,
            boundedContext.name,
            boundedContext.root,
            boundedContext.sort,
            boundedContext.isActive,
            new IamBoundedContextCreatedAt({ currentTimestamp: true }),
            new IamBoundedContextUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateBoundedContexts,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddBoundedContextsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const boundedContextsRegistered = this.publisher.mergeObjectContext(new IamAddBoundedContextsContextEvent(aggregateBoundedContexts));

        boundedContextsRegistered.created(); // apply event to model events
        boundedContextsRegistered.commit(); // commit all events of model
    }
}
