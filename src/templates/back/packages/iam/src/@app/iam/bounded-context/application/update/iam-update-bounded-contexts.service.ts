import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    IamBoundedContextId,
    IamBoundedContextName,
    IamBoundedContextRoot,
    IamBoundedContextSort,
    IamBoundedContextIsActive,
    IamBoundedContextCreatedAt,
    IamBoundedContextUpdatedAt,
    IamBoundedContextDeletedAt,
} from '../../domain/value-objects';
import { IamIBoundedContextRepository } from '../../domain/iam-bounded-context.repository';
import { IamBoundedContext } from '../../domain/iam-bounded-context.aggregate';
import { IamAddBoundedContextsContextEvent } from '../events/iam-add-bounded-contexts-context.event';

@Injectable()
export class IamUpdateBoundedContextsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIBoundedContextRepository,
    ) {}

    async main(
        payload: {
            id?: IamBoundedContextId;
            name?: IamBoundedContextName;
            root?: IamBoundedContextRoot;
            sort?: IamBoundedContextSort;
            isActive?: IamBoundedContextIsActive;
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
            new IamBoundedContextUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(
            boundedContext,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const boundedContexts = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const boundedContextsRegister = this.publisher.mergeObjectContext(
            new IamAddBoundedContextsContextEvent(boundedContexts),
        );

        boundedContextsRegister.updated(); // apply event to model events
        boundedContextsRegister.commit(); // commit all events of model
    }
}
