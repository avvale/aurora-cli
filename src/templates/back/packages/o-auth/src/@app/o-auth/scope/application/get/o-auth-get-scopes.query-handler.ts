import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OAuthScopeResponse } from '../../domain/o-auth-scope.response';
import { OAuthScopeMapper } from '../../domain/o-auth-scope.mapper';
import { OAuthGetScopesQuery } from './o-auth-get-scopes.query';
import { OAuthGetScopesService } from './o-auth-get-scopes.service';

@QueryHandler(OAuthGetScopesQuery)
export class OAuthGetScopesQueryHandler implements IQueryHandler<OAuthGetScopesQuery>
{
    private readonly mapper: OAuthScopeMapper = new OAuthScopeMapper();

    constructor(
        private readonly getScopesService: OAuthGetScopesService,
    ) {}

    async execute(query: OAuthGetScopesQuery): Promise<OAuthScopeResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getScopesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
