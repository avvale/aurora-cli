import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OAuthScopeResponse } from '../../domain/o-auth-scope.response';
import { OAuthScopeMapper } from '../../domain/o-auth-scope.mapper';
import { OAuthRawSQLScopesQuery } from './o-auth-raw-sql-scopes.query';
import { OAuthRawSQLScopesService } from './o-auth-raw-sql-scopes.service';

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
