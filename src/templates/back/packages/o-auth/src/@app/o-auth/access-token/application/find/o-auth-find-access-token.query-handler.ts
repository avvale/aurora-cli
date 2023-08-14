import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OAuthAccessTokenResponse } from '../../domain/o-auth-access-token.response';
import { OAuthAccessTokenMapper } from '../../domain/o-auth-access-token.mapper';
import { OAuthFindAccessTokenQuery } from './o-auth-find-access-token.query';
import { OAuthFindAccessTokenService } from './o-auth-find-access-token.service';

@QueryHandler(OAuthFindAccessTokenQuery)
export class OAuthFindAccessTokenQueryHandler implements IQueryHandler<OAuthFindAccessTokenQuery>
{
    private readonly mapper: OAuthAccessTokenMapper = new OAuthAccessTokenMapper();

    constructor(
        private readonly findAccessTokenService: OAuthFindAccessTokenService,
    ) {}

    async execute(query: OAuthFindAccessTokenQuery): Promise<OAuthAccessTokenResponse>
    {
        const accessToken = await this.findAccessTokenService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(accessToken);
    }
}
