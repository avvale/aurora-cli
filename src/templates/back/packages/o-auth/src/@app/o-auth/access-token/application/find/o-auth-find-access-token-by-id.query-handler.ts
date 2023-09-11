import { OAuthAccessTokenMapper, OAuthAccessTokenResponse, OAuthFindAccessTokenByIdQuery } from '@app/o-auth/access-token';
import { OAuthFindAccessTokenByIdService } from '@app/o-auth/access-token/application/find/o-auth-find-access-token-by-id.service';
import { OAuthAccessTokenId } from '@app/o-auth/access-token/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

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
