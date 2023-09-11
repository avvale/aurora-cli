import { OAuthGetScopesQuery, OAuthScopeMapper, OAuthScopeResponse } from '@app/o-auth/scope';
import { OAuthGetScopesService } from '@app/o-auth/scope/application/get/o-auth-get-scopes.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthGetScopesQuery)
export class OAuthGetScopesQueryHandler implements IQueryHandler<OAuthGetScopesQuery>
{
    private readonly mapper: OAuthScopeMapper = new OAuthScopeMapper();

    constructor(
        private readonly getScopesService: OAuthGetScopesService,
    ) {}

    async execute(query: OAuthGetScopesQuery): Promise<OAuthScopeResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getScopesService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}
