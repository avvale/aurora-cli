import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OAuthAccessTokenResponse } from '../../domain/o-auth-access-token.response';
import { OAuthAccessTokenMapper } from '../../domain/o-auth-access-token.mapper';
import { OAuthRawSQLAccessTokensQuery } from './o-auth-raw-sql-access-tokens.query';
import { OAuthRawSQLAccessTokensService } from './o-auth-raw-sql-access-tokens.service';

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
