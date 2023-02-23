/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePermissionRoleCommand } from './create-permission-role.command';
import { CreatePermissionRoleService } from './create-permission-role.service';
import {
    PermissionRolePermissionId,
    PermissionRoleRoleId,
} from '../../domain/value-objects';

@CommandHandler(CreatePermissionRoleCommand)
export class CreatePermissionRoleCommandHandler implements ICommandHandler<CreatePermissionRoleCommand>
{
    constructor(
        private readonly createPermissionRoleService: CreatePermissionRoleService,
    ) {}

    async execute(command: CreatePermissionRoleCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createPermissionRoleService.main(
            {
                permissionId: new PermissionRolePermissionId(command.payload.permissionId),
                roleId: new PermissionRoleRoleId(command.payload.roleId),
            },
            command.cQMetadata,
        );
    }
}