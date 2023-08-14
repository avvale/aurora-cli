import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OAuthAccessTokenResponse } from '../../domain/o-auth-access-token.response';
import { OAuthAccessTokenMapper } from '../../domain/o-auth-access-token.mapper';
import { OAuthGetAccessTokensQuery } from './o-auth-get-access-tokens.query';
import { OAuthGetAccessTokensService } from './o-auth-get-access-tokens.service';

@QueryHandler(OAuthGetAccessTokensQuery)
export class OAuthGetAccessTokensQueryHandler implements IQueryHandler<OAuthGetAccessTokensQuery>
{
    private readonly mapper: OAuthAccessTokenMapper = new OAuthAccessTokenMapper();

    constructor(
        private readonly getAccessTokensService: OAuthGetAccessTokensService,
    ) {}

    async execute(query: OAuthGetAccessTokensQuery): Promise<OAuthAccessTokenResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getAccessTokensService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
