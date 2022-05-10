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

@Injectable()
export class UpdateScopeByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IScopeRepository,
    ) {}

    async main(
        payload: {
            id: ScopeId;
            code?: ScopeCode;
            name?: ScopeName;
        },
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


        // update by id
        await this.repository.updateById(scope, { constraint, cQMetadata, updateByIdOptions: cQMetadata?.repositoryOptions });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const scopeRegister = this.publisher.mergeObjectContext(
            scope,
        );

        scopeRegister.updated(scope); // apply event to model events
        scopeRegister.commit(); // commit all events of model
    }
}