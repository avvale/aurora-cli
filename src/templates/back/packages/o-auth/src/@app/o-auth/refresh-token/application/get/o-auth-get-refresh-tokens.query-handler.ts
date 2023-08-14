import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OAuthRefreshTokenResponse } from '../../domain/o-auth-refresh-token.response';
import { OAuthRefreshTokenMapper } from '../../domain/o-auth-refresh-token.mapper';
import { OAuthGetRefreshTokensQuery } from './o-auth-get-refresh-tokens.query';
import { OAuthGetRefreshTokensService } from './o-auth-get-refresh-tokens.service';

@QueryHandler(OAuthGetRefreshTokensQuery)
export class OAuthGetRefreshTokensQueryHandler implements IQueryHandler<OAuthGetRefreshTokensQuery>
{
    private readonly mapper: OAuthRefreshTokenMapper = new OAuthRefreshTokenMapper();

    constructor(
        private readonly getRefreshTokensService: OAuthGetRefreshTokensService,
    ) {}

    async execute(query: OAuthGetRefreshTokensQuery): Promise<OAuthRefreshTokenResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getRefreshTokensService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
