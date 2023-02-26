import { ConflictException, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from '@aurora-ts/core';
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
export class UpsertScopeService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IScopeRepository,
    ) {}

    async main(
        payload: {
            id: ScopeId;
            code: ScopeCode;
            name: ScopeName;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // upsert aggregate with factory pattern
        const scope = OAuthScope.register(
            payload.id,
            payload.code,
            payload.name,
            new ScopeCreatedAt({ currentTimestamp: true }),
            new ScopeUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository
            .upsert(scope, {
                upsertOptions: cQMetadata?.repositoryOptions,
            });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const scopeRegister = this.publisher.mergeObjectContext(
            scope,
        );

        scopeRegister.created(scope); // apply event to model events
        scopeRegister.commit(); // commit all events of model
    }
}