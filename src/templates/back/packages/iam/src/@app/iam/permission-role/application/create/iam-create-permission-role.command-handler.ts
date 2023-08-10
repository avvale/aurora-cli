/* eslint-disable key-spacing */
import { IamCreatePermissionRoleCommand } from '@app/iam/permission-role';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
    IamPermissionRolePermissionId,
    IamPermissionRoleRoleId,
} from '../../domain/value-objects';
import { IamCreatePermissionRoleService } from './iam-create-permission-role.service';

@CommandHandler(IamCreatePermissionRoleCommand)
export class IamCreatePermissionRoleCommandHandler implements ICommandHandler<IamCreatePermissionRoleCommand>
{
    constructor(
        private readonly createPermissionRoleService: IamCreatePermissionRoleService,
    ) {}

    async execute(command: IamCreatePermissionRoleCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createPermissionRoleService.main(
            {
                permissionId: new IamPermissionRolePermissionId(command.payload.permissionId),
                roleId: new IamPermissionRoleRoleId(command.payload.roleId),
            },
            command.cQMetadata,
        );
    }
}