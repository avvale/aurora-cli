import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from 'aurora-ts-core';
import {
    ScopeId,
    ScopeCode,
    ScopeName,
    ScopeCreatedAt,
    ScopeUpdatedAt,
    ScopeDeletedAt,
} from '../../domain/value-objects';
import { IScopeRepository } from '../../domain/scope.repository';
import { OAuthScope } from '../../domain/scope.aggregate';
import { AddScopesContextEvent } from '../events/add-scopes-context.event';

@Injectable()
export class CreateScopesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IScopeRepository,
    ) {}

    async main(
        scopes: {
            id: ScopeId;
            code: ScopeCode;
            name: ScopeName;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateScopes = scopes.map(scope => OAuthScope.register(
            scope.id,
            scope.code,
            scope.name,
            new ScopeCreatedAt({ currentTimestamp: true }),
            new ScopeUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(aggregateScopes, { insertOptions: cQMetadata?.repositoryOptions });

        // create AddScopesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const scopesRegistered = this.publisher.mergeObjectContext(new AddScopesContextEvent(aggregateScopes));

        scopesRegistered.created(); // apply event to model events
        scopesRegistered.commit(); // commit all events of model
    }
}