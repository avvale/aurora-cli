import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OAuthScopeResponse } from '../../domain/o-auth-scope.response';
import { OAuthScopeMapper } from '../../domain/o-auth-scope.mapper';
import { OAuthFindScopeQuery } from './o-auth-find-scope.query';
import { OAuthFindScopeService } from './o-auth-find-scope.service';

@QueryHandler(OAuthFindScopeQuery)
export class OAuthFindScopeQueryHandler implements IQueryHandler<OAuthFindScopeQuery>
{
    private readonly mapper: OAuthScopeMapper = new OAuthScopeMapper();

    constructor(
        private readonly findScopeService: OAuthFindScopeService,
    ) {}

    async execute(query: OAuthFindScopeQuery): Promise<OAuthScopeResponse>
    {
        const scope = await this.findScopeService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(scope);
    }
}
