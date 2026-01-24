/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import {
  IamGetPermissionsQuery,
  IamPermission,
  IamPermissionMapper,
  IamPermissionResponse,
} from '@app/iam/permission';
import { IamGetPermissionsService } from '@app/iam/permission/application/get/iam-get-permissions.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamGetPermissionsQuery)
export class IamGetPermissionsQueryHandler
  implements IQueryHandler<IamGetPermissionsQuery>
{
  private readonly mapper: IamPermissionMapper = new IamPermissionMapper();

  constructor(
    private readonly getPermissionsService: IamGetPermissionsService,
  ) {}

  async execute(
    query: IamGetPermissionsQuery,
  ): Promise<IamPermissionResponse[] | LiteralObject[]> {
    const models = await this.getPermissionsService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    if (query.cQMetadata?.excludeMapModelToAggregate) return models;

    return this.mapper.mapAggregatesToResponses(models as IamPermission[]);
  }
}
