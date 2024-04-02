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
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class OAuthUpdateAndIncrementScopesService
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
            roleIds?: OAuthScopeRoleIds;
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
            payload.roleIds,
            null, // createdAt
            new OAuthScopeUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update and increment
        await this.repository.updateAndIncrement(
            scope,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateAndIncrementOptions: cQMetadata?.repositoryOptions,
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

        scopesRegister.updatedAndIncremented(); // apply event to model events
        scopesRegister.commit(); // commit all events of model
    }
}
