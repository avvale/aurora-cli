/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpsertPermissionCommand } from './upsert-permission.command';
import { UpsertPermissionService } from './upsert-permission.service';
import {
    PermissionId,
    PermissionName,
    PermissionBoundedContextId,
    PermissionRoleIds,
    PermissionCreatedAt,
    PermissionUpdatedAt,
    PermissionDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpsertPermissionCommand)
export class UpsertPermissionCommandHandler implements ICommandHandler<UpsertPermissionCommand>
{
    constructor(
        private readonly upsertPermissionService: UpsertPermissionService,
    ) {}

    async execute(command: UpsertPermissionCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertPermissionService.main(
            {
                id: new PermissionId(command.payload.id),
                name: new PermissionName(command.payload.name),
                boundedContextId: new PermissionBoundedContextId(command.payload.boundedContextId),
                roleIds: new PermissionRoleIds(command.payload.roleIds),
            },
            command.cQMetadata,
        );
    }
}