/* eslint-disable key-spacing */
import { IamUpdatePermissionRoleByIdCommand } from '@app/iam/permission-role';
import { IamUpdatePermissionRoleByIdService } from '@app/iam/permission-role/application/update/iam-update-permission-role-by-id.service';
import {
    IamPermissionRolePermissionId,
    IamPermissionRoleRoleId,
} from '@app/iam/permission-role/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpdatePermissionRoleByIdCommand)
export class IamUpdatePermissionRoleByIdCommandHandler
    implements ICommandHandler<IamUpdatePermissionRoleByIdCommand>
{
    constructor(
        private readonly updatePermissionRoleByIdService: IamUpdatePermissionRoleByIdService,
    ) {}

    async execute(command: IamUpdatePermissionRoleByIdCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.updatePermissionRoleByIdService.main(
            {
                permissionId: new IamPermissionRolePermissionId(
                    command.payload.permissionId,
                ),
                roleId: new IamPermissionRoleRoleId(command.payload.roleId),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
