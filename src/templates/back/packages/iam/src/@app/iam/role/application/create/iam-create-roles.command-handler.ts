/* eslint-disable key-spacing */
import { IamCreateRolesCommand } from '@app/iam/role';
import { IamCreateRolesService } from '@app/iam/role/application/create/iam-create-roles.service';
import {
  IamRoleAccountIds,
  IamRoleDefaultRedirection,
  IamRoleHasHiddenVerticalNavigation,
  IamRoleId,
  IamRoleIsMaster,
  IamRoleName,
  IamRolePermissionIds,
} from '@app/iam/role/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamCreateRolesCommand)
export class IamCreateRolesCommandHandler
  implements ICommandHandler<IamCreateRolesCommand>
{
  constructor(private readonly createRolesService: IamCreateRolesService) {}

  async execute(command: IamCreateRolesCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createRolesService.main(
      command.payload.map((role) => {
        return {
          id: new IamRoleId(role.id),
          name: new IamRoleName(role.name),
          defaultRedirection: new IamRoleDefaultRedirection(
            role.defaultRedirection,
          ),
          hasHiddenVerticalNavigation: new IamRoleHasHiddenVerticalNavigation(
            role.hasHiddenVerticalNavigation,
          ),
          isMaster: new IamRoleIsMaster(role.isMaster),
          permissionIds: new IamRolePermissionIds(role.permissionIds),
          accountIds: new IamRoleAccountIds(role.accountIds),
        };
      }),
      command.cQMetadata,
    );
  }
}
