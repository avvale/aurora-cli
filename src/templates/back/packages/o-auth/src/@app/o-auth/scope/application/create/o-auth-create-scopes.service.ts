import { OAuthAddScopesContextEvent, OAuthIScopeRepository, OAuthScope } from '@app/o-auth/scope';
import {
    OAuthScopeCode,
    OAuthScopeCreatedAt,
    OAuthScopeDeletedAt,
    OAuthScopeId,
    OAuthScopeName,
    OAuthScopeUpdatedAt,
} from '@app/o-auth/scope/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class OAuthCreateScopesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: OAuthIScopeRepository,
    ) {}

    async main(
        scopes: {
            id: OAuthScopeId;
            code: OAuthScopeCode;
            name: OAuthScopeName;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateScopes = scopes.map(scope => OAuthScope.register(
            scope.id,
            scope.code,
            scope.name,
            new OAuthScopeCreatedAt({ currentTimestamp: true }),
            new OAuthScopeUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateScopes,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddScopesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const scopesRegistered = this.publisher.mergeObjectContext(new OAuthAddScopesContextEvent(aggregateScopes));

        scopesRegistered.created(); // apply event to model events
        scopesRegistered.commit(); // commit all events of model
    }
}
