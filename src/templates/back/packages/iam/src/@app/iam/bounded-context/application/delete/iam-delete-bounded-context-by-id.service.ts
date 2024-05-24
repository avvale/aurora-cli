import { IamIBoundedContextRepository } from '@app/iam/bounded-context';
import { IamBoundedContextId } from '@app/iam/bounded-context/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamDeleteBoundedContextByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIBoundedContextRepository,
    ) {}

    async main(
        id: IamBoundedContextId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const boundedContext = await this.repository
            .findById(
                id,
                {
                    constraint,
                    cQMetadata,
                },
            );

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository
            .deleteById(
                boundedContext.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const boundedContextRegister = this.publisher.mergeObjectContext(boundedContext);

        boundedContextRegister.deleted({
            payload: boundedContext,
            cQMetadata,
        }); // apply event to model events
        boundedContextRegister.commit(); // commit all events of model
    }
}
