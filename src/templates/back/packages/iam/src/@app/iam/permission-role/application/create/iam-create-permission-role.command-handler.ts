/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import { IamCreatePermissionRoleCommand } from '@app/iam/permission-role';
import { IamCreatePermissionRoleService } from '@app/iam/permission-role/application/create/iam-create-permission-role.service';
import {
  IamPermissionRolePermissionId,
  IamPermissionRoleRoleId,
} from '@app/iam/permission-role/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamCreatePermissionRoleCommand)
export class IamCreatePermissionRoleCommandHandler
  implements ICommandHandler<IamCreatePermissionRoleCommand>
{
  constructor(
    private readonly createPermissionRoleService: IamCreatePermissionRoleService,
  ) {}

  async execute(command: IamCreatePermissionRoleCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createPermissionRoleService.main(
      {
        permissionId: new IamPermissionRolePermissionId(
          command.payload.permissionId,
        ),
        roleId: new IamPermissionRoleRoleId(command.payload.roleId),
      },
      command.cQMetadata,
    );
  }
}
