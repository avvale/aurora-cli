/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamCreatePermissionsCommand } from './iam-create-permissions.command';
import { IamCreatePermissionsService } from './iam-create-permissions.service';
import {
    IamPermissionId,
    IamPermissionName,
    IamPermissionBoundedContextId,
    IamPermissionRoleIds,
    IamPermissionCreatedAt,
    IamPermissionUpdatedAt,
    IamPermissionDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(IamCreatePermissionsCommand)
export class IamCreatePermissionsCommandHandler implements ICommandHandler<IamCreatePermissionsCommand>
{
    constructor(
        private readonly createPermissionsService: IamCreatePermissionsService,
    ) {}

    async execute(command: IamCreatePermissionsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createPermissionsService.main(
            command.payload
                .map(permission =>
                {
                    return {
                        id: new IamPermissionId(permission.id),
                        name: new IamPermissionName(permission.name),
                        boundedContextId: new IamPermissionBoundedContextId(permission.boundedContextId),
                        roleIds: new IamPermissionRoleIds(permission.roleIds),
                    };
                }),
            command.cQMetadata,
        );
    }
}
