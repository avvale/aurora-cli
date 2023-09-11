/* eslint-disable key-spacing */
import { IamUpsertPermissionRoleCommand } from '@app/iam/permission-role';
import { IamUpsertPermissionRoleService } from '@app/iam/permission-role/application/upsert/iam-upsert-permission-role.service';
import {
    IamPermissionRolePermissionId,
    IamPermissionRoleRoleId,
} from '@app/iam/permission-role/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpsertPermissionRoleCommand)
export class IamUpsertPermissionRoleCommandHandler implements ICommandHandler<IamUpsertPermissionRoleCommand>
{
    constructor(
        private readonly upsertPermissionRoleService: IamUpsertPermissionRoleService,
    ) {}

    async execute(command: IamUpsertPermissionRoleCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertPermissionRoleService.main(
            {
                permissionId: new IamPermissionRolePermissionId(command.payload.permissionId),
                roleId: new IamPermissionRoleRoleId(command.payload.roleId),
            },
            command.cQMetadata,
        );
    }
}
