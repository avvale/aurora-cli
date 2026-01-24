/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import {
  IamPaginatePermissionsQuery,
  IamPermissionMapper,
} from '@app/iam/permission';
import { IamPaginatePermissionsService } from '@app/iam/permission/application/paginate/iam-paginate-permissions.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamPaginatePermissionsQuery)
export class IamPaginatePermissionsQueryHandler
  implements IQueryHandler<IamPaginatePermissionsQuery>
{
  private readonly mapper: IamPermissionMapper = new IamPermissionMapper();

  constructor(
    private readonly paginatePermissionsService: IamPaginatePermissionsService,
  ) {}

  async execute(
    query: IamPaginatePermissionsQuery,
  ): Promise<PaginationResponse> {
    const { total, count, rows } = await this.paginatePermissionsService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    return new PaginationResponse(
      total,
      count,
      this.mapper.mapAggregatesToResponses(rows),
    );
  }
}
