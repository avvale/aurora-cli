import { OAuthAccessTokenMapper, OAuthAccessTokenResponse, OAuthRawSQLAccessTokensQuery } from '@app/o-auth/access-token';
import { OAuthRawSQLAccessTokensService } from '@app/o-auth/access-token/application/raw-sql/o-auth-raw-sql-access-tokens.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthRawSQLAccessTokensQuery)
export class OAuthRawSQLAccessTokensQueryHandler implements IQueryHandler<OAuthRawSQLAccessTokensQuery>
{
    private readonly mapper: OAuthAccessTokenMapper = new OAuthAccessTokenMapper();

    constructor(
        private readonly rawSQLAccessTokensService: OAuthRawSQLAccessTokensService,
    ) {}

    async execute(query: OAuthRawSQLAccessTokensQuery): Promise<OAuthAccessTokenResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLAccessTokensService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
