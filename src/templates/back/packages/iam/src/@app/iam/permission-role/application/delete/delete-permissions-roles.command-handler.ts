import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePermissionsRolesCommand } from './delete-permissions-roles.command';
import { DeletePermissionsRolesService } from './delete-permissions-roles.service';
import {
    PermissionRolePermissionId,
    PermissionRoleRoleId,
} from '../../domain/value-objects';

@CommandHandler(DeletePermissionsRolesCommand)
export class DeletePermissionsRolesCommandHandler implements ICommandHandler<DeletePermissionsRolesCommand>
{
    constructor(
        private readonly deletePermissionsRolesService: DeletePermissionsRolesService,
    ) {}

    async execute(command: DeletePermissionsRolesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deletePermissionsRolesService.main(
            command.payload
                .map(permission =>
                {
                    return {
                        permissionId: new PermissionRolePermissionId(permission.permissionId),
                        roleId      : new PermissionRoleRoleId(permission.roleId),
                    };
                }),
            command.constraint,
            command.cQMetadata,
        );
    }
}