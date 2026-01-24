import {
  OAuthAccessTokenMapper,
  OAuthAccessTokenResponse,
  OAuthFindAccessTokenQuery,
} from '@app/o-auth/access-token';
import { OAuthFindAccessTokenService } from '@app/o-auth/access-token/application/find/o-auth-find-access-token.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthFindAccessTokenQuery)
export class OAuthFindAccessTokenQueryHandler
  implements IQueryHandler<OAuthFindAccessTokenQuery>
{
  private readonly mapper: OAuthAccessTokenMapper =
    new OAuthAccessTokenMapper();

  constructor(
    private readonly findAccessTokenService: OAuthFindAccessTokenService,
  ) {}

  async execute(
    query: OAuthFindAccessTokenQuery,
  ): Promise<OAuthAccessTokenResponse> {
    const accessToken = await this.findAccessTokenService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(accessToken);
  }
}
