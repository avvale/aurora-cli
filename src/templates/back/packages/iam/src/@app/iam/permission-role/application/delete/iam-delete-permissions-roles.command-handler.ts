import { IamDeletePermissionsRolesCommand } from '@app/iam/permission-role';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
    IamPermissionRolePermissionId,
    IamPermissionRoleRoleId,
} from '../../domain/value-objects';
import { IamDeletePermissionsRolesService } from './iam-delete-permissions-roles.service';

@CommandHandler(IamDeletePermissionsRolesCommand)
export class IamDeletePermissionsRolesCommandHandler implements ICommandHandler<IamDeletePermissionsRolesCommand>
{
    constructor(
        private readonly deletePermissionsRolesService: IamDeletePermissionsRolesService,
    ) {}

    async execute(command: IamDeletePermissionsRolesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deletePermissionsRolesService.main(
            command.payload
                .map(permission =>
                {
                    return {
                        permissionId: new IamPermissionRolePermissionId(permission.permissionId),
                        roleId      : new IamPermissionRoleRoleId(permission.roleId),
                    };
                }),
            command.constraint,
            command.cQMetadata,
        );
    }
}