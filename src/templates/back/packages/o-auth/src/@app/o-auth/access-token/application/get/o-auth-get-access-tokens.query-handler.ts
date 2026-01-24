import {
  OAuthAccessToken,
  OAuthAccessTokenMapper,
  OAuthAccessTokenResponse,
  OAuthGetAccessTokensQuery,
} from '@app/o-auth/access-token';
import { OAuthGetAccessTokensService } from '@app/o-auth/access-token/application/get/o-auth-get-access-tokens.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthGetAccessTokensQuery)
export class OAuthGetAccessTokensQueryHandler
  implements IQueryHandler<OAuthGetAccessTokensQuery>
{
  private readonly mapper: OAuthAccessTokenMapper =
    new OAuthAccessTokenMapper();

  constructor(
    private readonly getAccessTokensService: OAuthGetAccessTokensService,
  ) {}

  async execute(
    query: OAuthGetAccessTokensQuery,
  ): Promise<OAuthAccessTokenResponse[] | LiteralObject[]> {
    const models = await this.getAccessTokensService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    if (query.cQMetadata?.excludeMapModelToAggregate) return models;

    return this.mapper.mapAggregatesToResponses(models as OAuthAccessToken[]);
  }
}
