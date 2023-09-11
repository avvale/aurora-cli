import { OAuthRawSQLRefreshTokensQuery, OAuthRefreshTokenMapper, OAuthRefreshTokenResponse } from '@app/o-auth/refresh-token';
import { OAuthRawSQLRefreshTokensService } from '@app/o-auth/refresh-token/application/raw-sql/o-auth-raw-sql-refresh-tokens.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthRawSQLRefreshTokensQuery)
export class OAuthRawSQLRefreshTokensQueryHandler implements IQueryHandler<OAuthRawSQLRefreshTokensQuery>
{
    private readonly mapper: OAuthRefreshTokenMapper = new OAuthRefreshTokenMapper();

    constructor(
        private readonly rawSQLRefreshTokensService: OAuthRawSQLRefreshTokensService,
    ) {}

    async execute(query: OAuthRawSQLRefreshTokensQuery): Promise<OAuthRefreshTokenResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLRefreshTokensService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
