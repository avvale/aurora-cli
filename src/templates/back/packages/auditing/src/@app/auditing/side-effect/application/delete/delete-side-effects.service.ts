import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { ISideEffectRepository } from '../../domain/side-effect.repository';
import { AddSideEffectsContextEvent } from '../events/add-side-effects-context.event';

@Injectable()
export class DeleteSideEffectsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ISideEffectRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const sideEffects = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddSideEffectsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const sideEffectsRegistered = this.publisher.mergeObjectContext(
            new AddSideEffectsContextEvent(sideEffects),
        );

        sideEffectsRegistered.deleted(); // apply event to model events
        sideEffectsRegistered.commit(); // commit all events of model
    }
}