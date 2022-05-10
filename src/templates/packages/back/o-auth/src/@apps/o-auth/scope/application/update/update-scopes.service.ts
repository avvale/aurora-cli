import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from 'aurora-ts-core';
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
export class UpdateScopesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IScopeRepository,
    ) {}

    async main(
        payload: {
            id?: ScopeId;
            code?: ScopeCode;
            name?: ScopeName;
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
            new ScopeUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(scope, {
            queryStatement,
            constraint,
            cQMetadata,
            updateOptions: cQMetadata?.repositoryOptions,
        });

        // get objects to delete
        const scopes = await this.repository.get({ queryStatement, constraint, cQMetadata });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const scopesRegister = this.publisher.mergeObjectContext(
            new AddScopesContextEvent(scopes),
        );

        scopesRegister.updated(); // apply event to model events
        scopesRegister.commit(); // commit all events of model
    }
}