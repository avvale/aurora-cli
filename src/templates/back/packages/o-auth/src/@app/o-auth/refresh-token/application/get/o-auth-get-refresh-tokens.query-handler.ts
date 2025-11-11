import {
    OAuthGetRefreshTokensQuery,
    OAuthRefreshToken,
    OAuthRefreshTokenMapper,
    OAuthRefreshTokenResponse,
} from '@app/o-auth/refresh-token';
import { OAuthGetRefreshTokensService } from '@app/o-auth/refresh-token/application/get/o-auth-get-refresh-tokens.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthGetRefreshTokensQuery)
export class OAuthGetRefreshTokensQueryHandler
    implements IQueryHandler<OAuthGetRefreshTokensQuery>
{
    private readonly mapper: OAuthRefreshTokenMapper =
        new OAuthRefreshTokenMapper();

    constructor(
        private readonly getRefreshTokensService: OAuthGetRefreshTokensService,
    ) {}

    async execute(
        query: OAuthGetRefreshTokensQuery,
    ): Promise<OAuthRefreshTokenResponse[] | LiteralObject[]> {
        const models = await this.getRefreshTokensService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        if (query.cQMetadata?.excludeMapModelToAggregate) return models;

        return this.mapper.mapAggregatesToResponses(
            models as OAuthRefreshToken[],
        );
    }
}
