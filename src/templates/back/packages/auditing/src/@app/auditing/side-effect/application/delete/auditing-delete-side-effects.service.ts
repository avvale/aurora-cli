import {
    AuditingAddSideEffectsContextEvent,
    AuditingISideEffectRepository,
} from '@app/auditing/side-effect';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AuditingDeleteSideEffectsService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AuditingISideEffectRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // get objects to delete
        const sideEffects = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (sideEffects.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddSideEffectsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const sideEffectsRegistered = this.publisher.mergeObjectContext(
            new AuditingAddSideEffectsContextEvent(sideEffects, cQMetadata),
        );

        sideEffectsRegistered.deleted(); // apply event to model events
        sideEffectsRegistered.commit(); // commit all events of model
    }
}
