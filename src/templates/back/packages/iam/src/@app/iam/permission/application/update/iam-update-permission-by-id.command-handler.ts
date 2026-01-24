/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamUpdatePermissionByIdCommand } from '@app/iam/permission';
import { IamUpdatePermissionByIdService } from '@app/iam/permission/application/update/iam-update-permission-by-id.service';
import {
  IamPermissionBoundedContextId,
  IamPermissionId,
  IamPermissionName,
  IamPermissionRoleIds,
} from '@app/iam/permission/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpdatePermissionByIdCommand)
export class IamUpdatePermissionByIdCommandHandler
  implements ICommandHandler<IamUpdatePermissionByIdCommand>
{
  constructor(
    private readonly updatePermissionByIdService: IamUpdatePermissionByIdService,
  ) {}

  async execute(command: IamUpdatePermissionByIdCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.updatePermissionByIdService.main(
      {
        id: new IamPermissionId(command.payload.id),
        name: new IamPermissionName(command.payload.name, {
          undefinable: true,
        }),
        boundedContextId: new IamPermissionBoundedContextId(
          command.payload.boundedContextId,
          { undefinable: true },
        ),
        roleIds: new IamPermissionRoleIds(command.payload.roleIds),
      },
      command.constraint,
      command.cQMetadata,
    );
  }
}
