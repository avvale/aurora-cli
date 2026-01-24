import { OAuthPaginateAccessTokensQuery } from '@app/o-auth/access-token';
import { OAuthPaginateAccessTokensService } from '@app/o-auth/access-token/application/paginate/o-auth-paginate-access-tokens.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthPaginateAccessTokensQuery)
export class OAuthPaginateAccessTokensQueryHandler
  implements IQueryHandler<OAuthPaginateAccessTokensQuery>
{
  constructor(
    private readonly paginateAccessTokensService: OAuthPaginateAccessTokensService,
  ) {}

  async execute(
    query: OAuthPaginateAccessTokensQuery,
  ): Promise<PaginationResponse> {
    const { total, count, rows } = await this.paginateAccessTokensService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    return new PaginationResponse(
      total,
      count,
      rows.map((item) => item.toDTO()),
    );
  }
}
