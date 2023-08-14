import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OAuthRefreshTokenResponse } from '../../domain/o-auth-refresh-token.response';
import { OAuthRefreshTokenMapper } from '../../domain/o-auth-refresh-token.mapper';
import { OAuthRawSQLRefreshTokensQuery } from './o-auth-raw-sql-refresh-tokens.query';
import { OAuthRawSQLRefreshTokensService } from './o-auth-raw-sql-refresh-tokens.service';

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
