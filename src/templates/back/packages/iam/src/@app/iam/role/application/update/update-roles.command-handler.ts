/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRolesCommand } from './update-roles.command';
import { UpdateRolesService } from './update-roles.service';
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

@CommandHandler(UpdateRolesCommand)
export class UpdateRolesCommandHandler implements ICommandHandler<UpdateRolesCommand>
{
    constructor(
        private readonly updateRolesService: UpdateRolesService,
    ) {}

    async execute(command: UpdateRolesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateRolesService.main(
            {
                id: new RoleId(command.payload.id, { undefinable: true }),
                name: new RoleName(command.payload.name, { undefinable: true }),
                isMaster: new RoleIsMaster(command.payload.isMaster, { undefinable: true }),
                permissionIds: new RolePermissionIds(command.payload.permissionIds),
                accountIds: new RoleAccountIds(command.payload.accountIds),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}