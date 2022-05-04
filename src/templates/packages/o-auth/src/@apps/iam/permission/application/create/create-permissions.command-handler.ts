/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePermissionsCommand } from './create-permissions.command';
import { CreatePermissionsService } from './create-permissions.service';
import {
    PermissionId,
    PermissionName,
    PermissionBoundedContextId,
    PermissionRoleIds,
    PermissionCreatedAt,
    PermissionUpdatedAt,
    PermissionDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(CreatePermissionsCommand)
export class CreatePermissionsCommandHandler implements ICommandHandler<CreatePermissionsCommand>
{
    constructor(
        private readonly createPermissionsService: CreatePermissionsService,
    ) {}

    async execute(command: CreatePermissionsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createPermissionsService.main(
            command.payload
                .map(permission =>
                {
                    return {
                        id: new PermissionId(permission.id),
                        name: new PermissionName(permission.name),
                        boundedContextId: new PermissionBoundedContextId(permission.boundedContextId),
                        roleIds: new PermissionRoleIds(permission.roleIds),
                    };
                }),
            command.cQMetadata,
        );
    }
}