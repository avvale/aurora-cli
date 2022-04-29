/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRoleCommand } from './update-role.command';
import { UpdateRoleService } from './update-role.service';
import {
    RoleId,
    RoleName,
    RoleIsMaster,
    RolePermissionIds,
    RoleAccountIds,
    RoleCreatedAt,
    RoleUpdatedAt,
    RoleDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleCommandHandler implements ICommandHandler<UpdateRoleCommand>
{
    constructor(
        private readonly updateRoleService: UpdateRoleService,
    ) {}

    async execute(command: UpdateRoleCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateRoleService.main(
            {
                id: new RoleId(command.payload.id),
                name: new RoleName(command.payload.name, { undefinable: true }),
                isMaster: new RoleIsMaster(command.payload.isMaster, { undefinable: true }),
                permissionIds: new RolePermissionIds(command.payload.permissionIds),
                accountIds: new RoleAccountIds(command.payload.accountIds),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}