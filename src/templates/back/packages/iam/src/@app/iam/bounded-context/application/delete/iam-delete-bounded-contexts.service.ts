import { IamAddBoundedContextsContextEvent, IamIBoundedContextRepository } from '@app/iam/bounded-context';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamDeleteBoundedContextsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIBoundedContextRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const boundedContexts = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (boundedContexts.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddBoundedContextsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const boundedContextsRegistered = this.publisher.mergeObjectContext(
            new IamAddBoundedContextsContextEvent(
                boundedContexts,
                cQMetadata,
            ),
        );

        boundedContextsRegistered.deleted(); // apply event to model events
        boundedContextsRegistered.commit(); // commit all events of model
    }
}
