import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';
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
export class UpdateBoundedContextsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IBoundedContextRepository,
    ) {}

    async main(
        payload: {
            id?: BoundedContextId;
            name?: BoundedContextName;
            root?: BoundedContextRoot;
            sort?: BoundedContextSort;
            isActive?: BoundedContextIsActive;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const boundedContext = IamBoundedContext.register(
            payload.id,
            payload.name,
            payload.root,
            payload.sort,
            payload.isActive,
            null, // createdAt
            new BoundedContextUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(boundedContext, {
            queryStatement,
            constraint,
            cQMetadata,
            updateOptions: cQMetadata?.repositoryOptions,
        });

        // get objects to delete
        const boundedContexts = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const boundedContextsRegister = this.publisher.mergeObjectContext(
            new AddBoundedContextsContextEvent(boundedContexts),
        );

        boundedContextsRegister.updated(); // apply event to model events
        boundedContextsRegister.commit(); // commit all events of model
    }
}