import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { OAuthScope } from './o-auth-scope.aggregate';
import { OAuthScopeResponse } from './o-auth-scope.response';
import {
    OAuthScopeId,
    OAuthScopeCode,
    OAuthScopeName,
    OAuthScopeCreatedAt,
    OAuthScopeUpdatedAt,
    OAuthScopeDeletedAt,
} from './value-objects';

export class OAuthScopeMapper implements IMapper
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

        return scopes.map(scope => this.makeAggregate(scope, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param scope
     */
    mapAggregateToResponse(scope: OAuthScope): OAuthScopeResponse
    {
        return this.makeResponse(scope);
    }

    /**
     * Map array of aggregates to array responses
     * @param scopes
     */
    mapAggregatesToResponses(scopes: OAuthScope[]): OAuthScopeResponse[]
    {
        if (!Array.isArray(scopes)) return;

        return scopes.map(scope => this.makeResponse(scope));
    }

    private makeAggregate(scope: LiteralObject, cQMetadata?: CQMetadata): OAuthScope
    {
        return OAuthScope.register(
            new OAuthScopeId(scope.id, { undefinable: true }),
            new OAuthScopeCode(scope.code, { undefinable: true }),
            new OAuthScopeName(scope.name, { undefinable: true }),
            new OAuthScopeCreatedAt(scope.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new OAuthScopeUpdatedAt(scope.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new OAuthScopeDeletedAt(scope.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
        );
    }

    private makeResponse(scope: OAuthScope): OAuthScopeResponse
    {
        if (!scope) return;

        return new OAuthScopeResponse(
            scope.id.value,
            scope.code.value,
            scope.name.value,
            scope.createdAt.value,
            scope.updatedAt.value,
            scope.deletedAt.value,
        );
    }
}
