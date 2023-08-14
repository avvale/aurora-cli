import { OAuthIScopeRepository, OAuthScope } from '@app/o-auth/scope';
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
export class OAuthCreateScopeService
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
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const scope = OAuthScope.register(
            payload.id,
            payload.code,
            payload.name,
            new OAuthScopeCreatedAt({ currentTimestamp: true }),
            new OAuthScopeUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(
            scope,
            {
                createOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const scopeRegister = this.publisher.mergeObjectContext(
            scope,
        );

        scopeRegister.created(scope); // apply event to model events
        scopeRegister.commit(); // commit all events of model
    }
}
