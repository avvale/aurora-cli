import {
    OAuthFindScopeQuery,
    OAuthScopeMapper,
    OAuthScopeResponse,
} from '@app/o-auth/scope';
import { OAuthFindScopeService } from '@app/o-auth/scope/application/find/o-auth-find-scope.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthFindScopeQuery)
export class OAuthFindScopeQueryHandler
    implements IQueryHandler<OAuthFindScopeQuery>
{
    private readonly mapper: OAuthScopeMapper = new OAuthScopeMapper();

    constructor(private readonly findScopeService: OAuthFindScopeService) {}

    async execute(query: OAuthFindScopeQuery): Promise<OAuthScopeResponse> {
        const scope = await this.findScopeService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(scope);
    }
}
