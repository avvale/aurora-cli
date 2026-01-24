/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamUpdatePermissionsCommand } from '@app/iam/permission';
import { IamUpdatePermissionsService } from '@app/iam/permission/application/update/iam-update-permissions.service';
import {
  IamPermissionBoundedContextId,
  IamPermissionId,
  IamPermissionName,
  IamPermissionRoleIds,
} from '@app/iam/permission/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpdatePermissionsCommand)
export class IamUpdatePermissionsCommandHandler
  implements ICommandHandler<IamUpdatePermissionsCommand>
{
  constructor(
    private readonly updatePermissionsService: IamUpdatePermissionsService,
  ) {}

  async execute(command: IamUpdatePermissionsCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.updatePermissionsService.main(
      {
        id: new IamPermissionId(command.payload.id, {
          undefinable: true,
        }),
        name: new IamPermissionName(command.payload.name, {
          undefinable: true,
        }),
        boundedContextId: new IamPermissionBoundedContextId(
          command.payload.boundedContextId,
          { undefinable: true },
        ),
        roleIds: new IamPermissionRoleIds(command.payload.roleIds),
      },
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
