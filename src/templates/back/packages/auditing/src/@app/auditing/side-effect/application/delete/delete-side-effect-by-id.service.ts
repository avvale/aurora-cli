import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';
import { SideEffectId } from '../../domain/value-objects';
import { ISideEffectRepository } from '../../domain/side-effect.repository';

@Injectable()
export class DeleteSideEffectByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ISideEffectRepository,
    ) {}

    async main(
        id: SideEffectId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const sideEffect = await this.repository.findById(id, { constraint, cQMetadata });

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository.deleteById(
            sideEffect.id,
            {
                deleteOptions: cQMetadata?.repositoryOptions,
                cQMetadata,
            },
        );

        // insert EventBus in object, to be able to apply and commit events
        const sideEffectRegister = this.publisher.mergeObjectContext(sideEffect);

        sideEffectRegister.deleted(sideEffect); // apply event to model events
        sideEffectRegister.commit(); // commit all events of model
    }
}