/* eslint-disable key-spacing */
import { IamUpdateAndIncrementPermissionsCommand } from '@app/iam/permission';
import { IamUpdateAndIncrementPermissionsService } from '@app/iam/permission/application/update/iam-update-and-increment-permissions.service';
import {
    IamPermissionBoundedContextId,
    IamPermissionId,
    IamPermissionName,
    IamPermissionRoleIds,
} from '@app/iam/permission/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpdateAndIncrementPermissionsCommand)
export class IamUpdateAndIncrementPermissionsCommandHandler implements ICommandHandler<IamUpdateAndIncrementPermissionsCommand>
{
    constructor(
        private readonly updatePermissionsService: IamUpdateAndIncrementPermissionsService,
    ) {}

    async execute(command: IamUpdateAndIncrementPermissionsCommand): Promise<void>
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
