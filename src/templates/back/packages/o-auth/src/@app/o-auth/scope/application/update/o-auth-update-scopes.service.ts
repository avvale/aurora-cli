import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    OAuthScopeId,
    OAuthScopeCode,
    OAuthScopeName,
    OAuthScopeCreatedAt,
    OAuthScopeUpdatedAt,
    OAuthScopeDeletedAt,
} from '../../domain/value-objects';
import { OAuthIScopeRepository } from '../../domain/o-auth-scope.repository';
import { OAuthScope } from '../../domain/o-auth-scope.aggregate';
import { OAuthAddScopesContextEvent } from '../events/o-auth-add-scopes-context.event';

@Injectable()
export class OAuthUpdateScopesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: OAuthIScopeRepository,
    ) {}

    async main(
        payload: {
            id?: OAuthScopeId;
            code?: OAuthScopeCode;
            name?: OAuthScopeName;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const scope = OAuthScope.register(
            payload.id,
            payload.code,
            payload.name,
            null, // createdAt
            new OAuthScopeUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(
            scope,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const scopes = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const scopesRegister = this.publisher.mergeObjectContext(
            new OAuthAddScopesContextEvent(scopes),
        );

        scopesRegister.updated(); // apply event to model events
        scopesRegister.commit(); // commit all events of model
    }
}
