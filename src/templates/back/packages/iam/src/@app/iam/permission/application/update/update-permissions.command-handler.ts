/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePermissionsCommand } from './update-permissions.command';
import { UpdatePermissionsService } from './update-permissions.service';
import {
    PermissionId,
    PermissionName,
    PermissionBoundedContextId,
    PermissionRoleIds,
    PermissionCreatedAt,
    PermissionUpdatedAt,
    PermissionDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpdatePermissionsCommand)
export class UpdatePermissionsCommandHandler implements ICommandHandler<UpdatePermissionsCommand>
{
    constructor(
        private readonly updatePermissionsService: UpdatePermissionsService,
    ) {}

    async execute(command: UpdatePermissionsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updatePermissionsService.main(
            {
                id: new PermissionId(command.payload.id, { undefinable: true }),
                name: new PermissionName(command.payload.name, { undefinable: true }),
                boundedContextId: new PermissionBoundedContextId(command.payload.boundedContextId, { undefinable: true }),
                roleIds: new PermissionRoleIds(command.payload.roleIds),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}