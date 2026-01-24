import { OAuthPaginateApplicationsQuery } from '@app/o-auth/application';
import { OAuthPaginateApplicationsService } from '@app/o-auth/application/application/paginate/o-auth-paginate-applications.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthPaginateApplicationsQuery)
export class OAuthPaginateApplicationsQueryHandler
  implements IQueryHandler<OAuthPaginateApplicationsQuery>
{
  constructor(
    private readonly paginateApplicationsService: OAuthPaginateApplicationsService,
  ) {}

  async execute(
    query: OAuthPaginateApplicationsQuery,
  ): Promise<PaginationResponse> {
    const { total, count, rows } = await this.paginateApplicationsService.main(
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
