/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import { IamUpdatePermissionsRolesCommand } from '@app/iam/permission-role';
import { IamUpdatePermissionsRolesService } from '@app/iam/permission-role/application/update/iam-update-permissions-roles.service';
import {
  IamPermissionRolePermissionId,
  IamPermissionRoleRoleId,
} from '@app/iam/permission-role/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpdatePermissionsRolesCommand)
export class IamUpdatePermissionsRolesCommandHandler
  implements ICommandHandler<IamUpdatePermissionsRolesCommand>
{
  constructor(
    private readonly updatePermissionsRolesService: IamUpdatePermissionsRolesService,
  ) {}

  async execute(command: IamUpdatePermissionsRolesCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.updatePermissionsRolesService.main(
      {
        permissionId: new IamPermissionRolePermissionId(
          command.payload.permissionId,
          { undefinable: true },
        ),
        roleId: new IamPermissionRoleRoleId(command.payload.roleId, {
          undefinable: true,
        }),
      },
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
