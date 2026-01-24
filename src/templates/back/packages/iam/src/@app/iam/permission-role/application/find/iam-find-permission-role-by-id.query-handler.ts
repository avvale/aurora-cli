/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import {
  IamFindPermissionRoleByIdQuery,
  IamPermissionRoleMapper,
  IamPermissionRoleResponse,
} from '@app/iam/permission-role';
import { IamFindPermissionRoleByIdService } from '@app/iam/permission-role/application/find/iam-find-permission-role-by-id.service';
import {
  IamPermissionRolePermissionId,
  IamPermissionRoleRoleId,
} from '@app/iam/permission-role/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamFindPermissionRoleByIdQuery)
export class IamFindPermissionRoleByIdQueryHandler
  implements IQueryHandler<IamFindPermissionRoleByIdQuery>
{
  private readonly mapper: IamPermissionRoleMapper =
    new IamPermissionRoleMapper();

  constructor(
    private readonly findPermissionRoleByIdService: IamFindPermissionRoleByIdService,
  ) {}

  async execute(
    query: IamFindPermissionRoleByIdQuery,
  ): Promise<IamPermissionRoleResponse> {
    const permissionRole = await this.findPermissionRoleByIdService.main(
      new IamPermissionRolePermissionId(query.permissionId),
      new IamPermissionRoleRoleId(query.roleId),
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(permissionRole);
  }
}
