/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamCreatePermissionsCommand } from '@app/iam/permission';
import { IamCreatePermissionsService } from '@app/iam/permission/application/create/iam-create-permissions.service';
import {
  IamPermissionBoundedContextId,
  IamPermissionId,
  IamPermissionName,
  IamPermissionRoleIds,
} from '@app/iam/permission/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamCreatePermissionsCommand)
export class IamCreatePermissionsCommandHandler
  implements ICommandHandler<IamCreatePermissionsCommand>
{
  constructor(
    private readonly createPermissionsService: IamCreatePermissionsService,
  ) {}

  async execute(command: IamCreatePermissionsCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createPermissionsService.main(
      command.payload.map((permission) => {
        return {
          id: new IamPermissionId(permission.id),
          name: new IamPermissionName(permission.name),
          boundedContextId: new IamPermissionBoundedContextId(
            permission.boundedContextId,
          ),
          roleIds: new IamPermissionRoleIds(permission.roleIds),
        };
      }),
      command.cQMetadata,
    );
  }
}
