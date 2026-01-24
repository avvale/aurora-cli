import { IamPaginateTenantsQuery } from '@app/iam/tenant';
import { IamPaginateTenantsService } from '@app/iam/tenant/application/paginate/iam-paginate-tenants.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamPaginateTenantsQuery)
export class IamPaginateTenantsQueryHandler
  implements IQueryHandler<IamPaginateTenantsQuery>
{
  constructor(
    private readonly paginateTenantsService: IamPaginateTenantsService,
  ) {}

  async execute(query: IamPaginateTenantsQuery): Promise<PaginationResponse> {
    const { total, count, rows } = await this.paginateTenantsService.main(
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
