/* eslint-disable key-spacing */
import { IamCreatePermissionCommand } from '@app/iam/permission';
import { IamCreatePermissionService } from '@app/iam/permission/application/create/iam-create-permission.service';
import {
    IamPermissionBoundedContextId,
    IamPermissionId,
    IamPermissionName,
    IamPermissionRoleIds,
} from '@app/iam/permission/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamCreatePermissionCommand)
export class IamCreatePermissionCommandHandler
    implements ICommandHandler<IamCreatePermissionCommand>
{
    constructor(
        private readonly createPermissionService: IamCreatePermissionService,
    ) {}

    async execute(command: IamCreatePermissionCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.createPermissionService.main(
            {
                id: new IamPermissionId(command.payload.id),
                name: new IamPermissionName(command.payload.name),
                boundedContextId: new IamPermissionBoundedContextId(
                    command.payload.boundedContextId,
                ),
                roleIds: new IamPermissionRoleIds(command.payload.roleIds),
            },
            command.cQMetadata,
        );
    }
}
