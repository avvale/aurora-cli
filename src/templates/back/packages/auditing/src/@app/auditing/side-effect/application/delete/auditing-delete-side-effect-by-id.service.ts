import { AuditingISideEffectRepository } from '@app/auditing/side-effect';
import { AuditingSideEffectId } from '@app/auditing/side-effect/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AuditingDeleteSideEffectByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AuditingISideEffectRepository,
    ) {}

    async main(
        id: AuditingSideEffectId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const sideEffect = await this.repository
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
