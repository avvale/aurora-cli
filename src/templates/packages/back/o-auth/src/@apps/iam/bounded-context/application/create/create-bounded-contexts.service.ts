import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from 'aurora-ts-core';
import {
    BoundedContextId,
    BoundedContextName,
    BoundedContextRoot,
    BoundedContextSort,
    BoundedContextIsActive,
    BoundedContextCreatedAt,
    BoundedContextUpdatedAt,
    BoundedContextDeletedAt,
} from '../../domain/value-objects';
import { IBoundedContextRepository } from '../../domain/bounded-context.repository';
import { IamBoundedContext } from '../../domain/bounded-context.aggregate';
import { AddBoundedContextsContextEvent } from '../events/add-bounded-contexts-context.event';

@Injectable()
export class CreateBoundedContextsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IBoundedContextRepository,
    ) {}

    async main(
        boundedContexts: {
            id: BoundedContextId;
            name: BoundedContextName;
            root: BoundedContextRoot;
            sort: BoundedContextSort;
            isActive: BoundedContextIsActive;
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
            new BoundedContextCreatedAt({ currentTimestamp: true }),
            new BoundedContextUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(aggregateBoundedContexts, { insertOptions: cQMetadata?.repositoryOptions });

        // create AddBoundedContextsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const boundedContextsRegistered = this.publisher.mergeObjectContext(new AddBoundedContextsContextEvent(aggregateBoundedContexts));

        boundedContextsRegistered.created(); // apply event to model events
        boundedContextsRegistered.commit(); // commit all events of model
    }
}