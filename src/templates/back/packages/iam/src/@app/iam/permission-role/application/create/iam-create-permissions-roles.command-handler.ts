import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamCreatePermissionsRolesCommand } from '@app/iam/permission-role';
import { IamCreatePermissionsRolesService } from './iam-create-permissions-roles.service';

import {
    IamPermissionRolePermissionId,
    IamPermissionRoleRoleId,
} from '../../domain/value-objects';

@CommandHandler(IamCreatePermissionsRolesCommand)
export class IamCreatePermissionsRolesCommandHandler implements ICommandHandler<IamCreatePermissionsRolesCommand>
{
    constructor(
        private readonly createPermissionsRolesService: IamCreatePermissionsRolesService,
    ) { }

    async execute(command: IamCreatePermissionsRolesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createPermissionsRolesService.main(
            command.payload
                .map(permission =>
                {
                    return {
                        permissionId: new IamPermissionRolePermissionId(permission.permissionId),
                        roleId      : new IamPermissionRoleRoleId(permission.roleId),
                    };
                }),
            command.cQMetadata,
        );
    }
}