/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamCreatePermissionCommand } from './iam-create-permission.command';
import { IamCreatePermissionService } from './iam-create-permission.service';
import {
    IamPermissionId,
    IamPermissionName,
    IamPermissionBoundedContextId,
    IamPermissionRoleIds,
    IamPermissionCreatedAt,
    IamPermissionUpdatedAt,
    IamPermissionDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(IamCreatePermissionCommand)
export class IamCreatePermissionCommandHandler implements ICommandHandler<IamCreatePermissionCommand>
{
    constructor(
        private readonly createPermissionService: IamCreatePermissionService,
    ) {}

    async execute(command: IamCreatePermissionCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createPermissionService.main(
            {
                id: new IamPermissionId(command.payload.id),
                name: new IamPermissionName(command.payload.name),
                boundedContextId: new IamPermissionBoundedContextId(command.payload.boundedContextId),
                roleIds: new IamPermissionRoleIds(command.payload.roleIds),
            },
            command.cQMetadata,
        );
    }
}
