import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { IScopeRepository } from '../../domain/scope.repository';
import { AddScopesContextEvent } from '../events/add-scopes-context.event';

@Injectable()
export class DeleteScopesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IScopeRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const scopes = await this.repository.get({ queryStatement, constraint, cQMetadata });

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddScopesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const scopesRegistered = this.publisher.mergeObjectContext(new AddScopesContextEvent(scopes));

        scopesRegistered.deleted(); // apply event to model events
        scopesRegistered.commit(); // commit all events of model
    }
}