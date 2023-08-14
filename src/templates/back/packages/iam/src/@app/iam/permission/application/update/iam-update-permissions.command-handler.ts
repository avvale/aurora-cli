/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamUpdatePermissionsCommand } from './iam-update-permissions.command';
import { IamUpdatePermissionsService } from './iam-update-permissions.service';
import {
    IamPermissionId,
    IamPermissionName,
    IamPermissionBoundedContextId,
    IamPermissionRoleIds,
    IamPermissionCreatedAt,
    IamPermissionUpdatedAt,
    IamPermissionDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(IamUpdatePermissionsCommand)
export class IamUpdatePermissionsCommandHandler implements ICommandHandler<IamUpdatePermissionsCommand>
{
    constructor(
        private readonly updatePermissionsService: IamUpdatePermissionsService,
    ) {}

    async execute(command: IamUpdatePermissionsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updatePermissionsService.main(
            {
                id: new IamPermissionId(command.payload.id, { undefinable: true }),
                name: new IamPermissionName(command.payload.name, { undefinable: true }),
                boundedContextId: new IamPermissionBoundedContextId(command.payload.boundedContextId, { undefinable: true }),
                roleIds: new IamPermissionRoleIds(command.payload.roleIds),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
