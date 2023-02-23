/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpsertRoleCommand } from './upsert-role.command';
import { UpsertRoleService } from './upsert-role.service';
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

@CommandHandler(UpsertRoleCommand)
export class UpsertRoleCommandHandler implements ICommandHandler<UpsertRoleCommand>
{
    constructor(
        private readonly upsertRoleService: UpsertRoleService,
    ) {}

    async execute(command: UpsertRoleCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertRoleService.main(
            {
                id: new RoleId(command.payload.id),
                name: new RoleName(command.payload.name),
                isMaster: new RoleIsMaster(command.payload.isMaster),
                permissionIds: new RolePermissionIds(command.payload.permissionIds),
                accountIds: new RoleAccountIds(command.payload.accountIds),
            },
            command.cQMetadata,
        );
    }
}