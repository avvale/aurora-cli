import {
    IamAddBoundedContextsContextEvent,
    IamBoundedContext,
    IamIBoundedContextRepository,
} from '@app/iam/bounded-context';
import {
    IamBoundedContextId,
    IamBoundedContextIsActive,
    IamBoundedContextName,
    IamBoundedContextRoot,
    IamBoundedContextSort,
    IamBoundedContextUpdatedAt,
} from '@app/iam/bounded-context/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamUpdateBoundedContextsService {
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
    ): Promise<void> {
        // create aggregate with factory pattern
        const boundedContext = IamBoundedContext.register(
            payload.id,
            undefined, // rowId
            payload.name,
            payload.root,
            payload.sort,
            payload.isActive,
            null, // createdAt
            new IamBoundedContextUpdatedAt({ currentTimestamp: true }),
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
            new IamAddBoundedContextsContextEvent(boundedContexts, cQMetadata),
        );

        boundedContextsRegister.updated(); // apply event to model events
        boundedContextsRegister.commit(); // commit all events of model
    }
}
