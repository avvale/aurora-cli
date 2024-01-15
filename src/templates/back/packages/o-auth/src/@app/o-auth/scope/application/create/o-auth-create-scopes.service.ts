import { OAuthAddScopesContextEvent, OAuthIScopeRepository, OAuthScope } from '@app/o-auth/scope';
import {
    OAuthScopeCode,
    OAuthScopeCreatedAt,
    OAuthScopeDeletedAt,
    OAuthScopeId,
    OAuthScopeName,
    OAuthScopeRoleIds,
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
        payload: {
            id: OAuthScopeId;
            code: OAuthScopeCode;
            name: OAuthScopeName;
            roleIds: OAuthScopeRoleIds;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateScopes = payload.map(scope => OAuthScope.register(
            scope.id,
            scope.code,
            scope.name,
            scope.roleIds,
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
