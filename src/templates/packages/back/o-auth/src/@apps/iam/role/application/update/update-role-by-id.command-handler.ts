/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRoleByIdCommand } from './update-role-by-id.command';
import { UpdateRoleByIdService } from './update-role-by-id.service';
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

@CommandHandler(UpdateRoleByIdCommand)
export class UpdateRoleByIdCommandHandler implements ICommandHandler<UpdateRoleByIdCommand>
{
    constructor(
        private readonly updateRoleByIdService: UpdateRoleByIdService,
    ) {}

    async execute(command: UpdateRoleByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateRoleByIdService.main(
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