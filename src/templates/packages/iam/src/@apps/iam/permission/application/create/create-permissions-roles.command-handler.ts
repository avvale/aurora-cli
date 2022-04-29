import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePermissionsRolesCommand } from './create-permissions-roles.command';
import { CreatePermissionsRolesService } from './create-permissions-roles.service';
import {
    PermissionPermissionId,
    PermissionRoleId,
} from './../../domain/value-objects';

@CommandHandler(CreatePermissionsRolesCommand)
export class CreatePermissionsRolesCommandHandler implements ICommandHandler<CreatePermissionsRolesCommand>
{
    constructor(
        private readonly createPermissionsRolesService: CreatePermissionsRolesService,
    ) { }

    async execute(command: CreatePermissionsRolesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createPermissionsRolesService.main(
            command.permissionsRoles
                .map(permission =>
                {
                    return {
                        permissionId: new PermissionPermissionId(permission.permissionId),
                        roleId      : new PermissionRoleId(permission.roleId),
                    };
                }),
        );
    }
}