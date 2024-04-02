/* eslint-disable key-spacing */
import { IamUpdateAndIncrementPermissionsRolesCommand } from '@app/iam/permission-role';
import { IamUpdateAndIncrementPermissionsRolesService } from '@app/iam/permission-role/application/update/iam-update-and-increment-permissions-roles.service';
import {
    IamPermissionRolePermissionId,
    IamPermissionRoleRoleId,
} from '@app/iam/permission-role/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpdateAndIncrementPermissionsRolesCommand)
export class IamUpdateAndIncrementPermissionsRolesCommandHandler implements ICommandHandler<IamUpdateAndIncrementPermissionsRolesCommand>
{
    constructor(
        private readonly updatePermissionsRolesService: IamUpdateAndIncrementPermissionsRolesService,
    ) {}

    async execute(command: IamUpdateAndIncrementPermissionsRolesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updatePermissionsRolesService.main(
            {
                permissionId: new IamPermissionRolePermissionId(command.payload.permissionId, { undefinable: true }),
                roleId: new IamPermissionRoleRoleId(command.payload.roleId, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
