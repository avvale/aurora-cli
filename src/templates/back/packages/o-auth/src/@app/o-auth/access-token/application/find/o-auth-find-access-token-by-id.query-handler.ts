import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OAuthAccessTokenResponse } from '../../domain/o-auth-access-token.response';
import { OAuthAccessTokenMapper } from '../../domain/o-auth-access-token.mapper';
import { OAuthAccessTokenId } from '../../domain/value-objects';
import { OAuthFindAccessTokenByIdQuery } from './o-auth-find-access-token-by-id.query';
import { OAuthFindAccessTokenByIdService } from './o-auth-find-access-token-by-id.service';

@QueryHandler(OAuthFindAccessTokenByIdQuery)
export class OAuthFindAccessTokenByIdQueryHandler implements IQueryHandler<OAuthFindAccessTokenByIdQuery>
{
    private readonly mapper: OAuthAccessTokenMapper = new OAuthAccessTokenMapper();

    constructor(
        private readonly findAccessTokenByIdService: OAuthFindAccessTokenByIdService,
    ) {}

    async execute(query: OAuthFindAccessTokenByIdQuery): Promise<OAuthAccessTokenResponse>
    {
        const accessToken = await this.findAccessTokenByIdService.main(
            new OAuthAccessTokenId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(accessToken);
    }
}
