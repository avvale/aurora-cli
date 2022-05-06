/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePermissionCommand } from './create-permission.command';
import { CreatePermissionService } from './create-permission.service';
import {
    PermissionId,
    PermissionName,
    PermissionBoundedContextId,
    PermissionRoleIds,
    PermissionCreatedAt,
    PermissionUpdatedAt,
    PermissionDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(CreatePermissionCommand)
export class CreatePermissionCommandHandler implements ICommandHandler<CreatePermissionCommand>
{
    constructor(
        private readonly createPermissionService: CreatePermissionService,
    ) {}

    async execute(command: CreatePermissionCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createPermissionService.main(
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