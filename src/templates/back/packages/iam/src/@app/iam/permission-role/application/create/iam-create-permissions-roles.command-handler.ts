/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import { IamCreatePermissionsRolesCommand } from '@app/iam/permission-role';
import { IamCreatePermissionsRolesService } from '@app/iam/permission-role/application/create/iam-create-permissions-roles.service';
import {
  IamPermissionRolePermissionId,
  IamPermissionRoleRoleId,
} from '@app/iam/permission-role/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamCreatePermissionsRolesCommand)
export class IamCreatePermissionsRolesCommandHandler
  implements ICommandHandler<IamCreatePermissionsRolesCommand>
{
  constructor(
    private readonly createPermissionsRolesService: IamCreatePermissionsRolesService,
  ) {}

  async execute(command: IamCreatePermissionsRolesCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createPermissionsRolesService.main(
      command.payload.map((permissionRole) => {
        return {
          permissionId: new IamPermissionRolePermissionId(
            permissionRole.permissionId,
          ),
          roleId: new IamPermissionRoleRoleId(permissionRole.roleId),
        };
      }),
      command.cQMetadata,
    );
  }
}
