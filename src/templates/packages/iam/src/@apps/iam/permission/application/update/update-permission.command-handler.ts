/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePermissionCommand } from './update-permission.command';
import { UpdatePermissionService } from './update-permission.service';
import {
    PermissionId,
    PermissionName,
    PermissionBoundedContextId,
    PermissionRoleIds,
    PermissionCreatedAt,
    PermissionUpdatedAt,
    PermissionDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpdatePermissionCommand)
export class UpdatePermissionCommandHandler implements ICommandHandler<UpdatePermissionCommand>
{
    constructor(
        private readonly updatePermissionService: UpdatePermissionService,
    ) {}

    async execute(command: UpdatePermissionCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updatePermissionService.main(
            {
                id: new PermissionId(command.payload.id),
                name: new PermissionName(command.payload.name, { undefinable: true }),
                boundedContextId: new PermissionBoundedContextId(command.payload.boundedContextId, { undefinable: true }),
                roleIds: new PermissionRoleIds(command.payload.roleIds),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}