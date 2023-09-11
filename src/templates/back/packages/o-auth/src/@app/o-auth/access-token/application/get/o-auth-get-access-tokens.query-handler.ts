import { OAuthAccessTokenMapper, OAuthAccessTokenResponse, OAuthGetAccessTokensQuery } from '@app/o-auth/access-token';
import { OAuthGetAccessTokensService } from '@app/o-auth/access-token/application/get/o-auth-get-access-tokens.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthGetAccessTokensQuery)
export class OAuthGetAccessTokensQueryHandler implements IQueryHandler<OAuthGetAccessTokensQuery>
{
    private readonly mapper: OAuthAccessTokenMapper = new OAuthAccessTokenMapper();

    constructor(
        private readonly getAccessTokensService: OAuthGetAccessTokensService,
    ) {}

    async execute(query: OAuthGetAccessTokensQuery): Promise<OAuthAccessTokenResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getAccessTokensService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}
