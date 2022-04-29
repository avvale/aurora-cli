import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { BoundedContextId } from '../../domain/value-objects';
import { IBoundedContextRepository } from '../../domain/bounded-context.repository';

@Injectable()
export class DeleteBoundedContextByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IBoundedContextRepository,
    ) {}

    async main(
        id: BoundedContextId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const boundedContext = await this.repository.findById(id, { constraint, cQMetadata });

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository.deleteById(
            boundedContext.id,
            {
                deleteOptions: cQMetadata?.repositoryOptions,
                cQMetadata,
            },
        );

        // insert EventBus in object, to be able to apply and commit events
        const boundedContextRegister = this.publisher.mergeObjectContext(boundedContext);

        boundedContextRegister.deleted(boundedContext); // apply event to model events
        boundedContextRegister.commit(); // commit all events of model
    }
}