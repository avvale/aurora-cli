import { OAuthRawSQLScopesQuery, OAuthScopeMapper, OAuthScopeResponse } from '@app/o-auth/scope';
import { OAuthRawSQLScopesService } from '@app/o-auth/scope/application/raw-sql/o-auth-raw-sql-scopes.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthRawSQLScopesQuery)
export class OAuthRawSQLScopesQueryHandler implements IQueryHandler<OAuthRawSQLScopesQuery>
{
    private readonly mapper: OAuthScopeMapper = new OAuthScopeMapper();

    constructor(
        private readonly rawSQLScopesService: OAuthRawSQLScopesService,
    ) {}

    async execute(query: OAuthRawSQLScopesQuery): Promise<OAuthScopeResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLScopesService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
