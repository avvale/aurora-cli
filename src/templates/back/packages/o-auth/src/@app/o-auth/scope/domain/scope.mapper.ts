import { LiteralObject } from '@nestjs/common';
import { IMapper, MapperOptions, CQMetadata } from '@aurora-ts/core';
import { OAuthScope } from './scope.aggregate';
import { ScopeResponse } from './scope.response';
import {
    ScopeId,
    ScopeCode,
    ScopeName,
    ScopeCreatedAt,
    ScopeUpdatedAt,
    ScopeDeletedAt,
} from './value-objects';

export class ScopeMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param scope
     */
    mapModelToAggregate(scope: LiteralObject, cQMetadata?: CQMetadata): OAuthScope
    {
        if (!scope) return;

        return this.makeAggregate(scope, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param scopes
     */
    mapModelsToAggregates(scopes: LiteralObject[], cQMetadata?: CQMetadata): OAuthScope[]
    {
        if (!Array.isArray(scopes)) return;

        return scopes.map(scope  => this.makeAggregate(scope, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param scope
     */
    mapAggregateToResponse(scope: OAuthScope): ScopeResponse
    {
        return this.makeResponse(scope);
    }

    /**
     * Map array of aggregates to array responses
     * @param scopes
     */
    mapAggregatesToResponses(scopes: OAuthScope[]): ScopeResponse[]
    {
        if (!Array.isArray(scopes)) return;

        return scopes.map(scope => this.makeResponse(scope));
    }

    private makeAggregate(scope: LiteralObject, cQMetadata?: CQMetadata): OAuthScope
    {
        return OAuthScope.register(
            new ScopeId(scope.id, { undefinable: true }),
            new ScopeCode(scope.code, { undefinable: true }),
            new ScopeName(scope.name, { undefinable: true }),
            new ScopeCreatedAt(scope.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new ScopeUpdatedAt(scope.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new ScopeDeletedAt(scope.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
        );
    }

    private makeResponse(scope: OAuthScope): ScopeResponse
    {
        if (!scope) return;

        return new ScopeResponse(
            scope.id.value,
            scope.code.value,
            scope.name.value,
            scope.createdAt.value,
            scope.updatedAt.value,
            scope.deletedAt.value,
        );
    }
}