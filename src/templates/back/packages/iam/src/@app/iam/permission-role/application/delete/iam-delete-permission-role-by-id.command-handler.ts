import { IamDeletePermissionRoleByIdCommand } from '@app/iam/permission-role';
import { IamDeletePermissionRoleByIdService } from '@app/iam/permission-role/application/delete/iam-delete-permission-role-by-id.service';
import {
    IamPermissionRolePermissionId,
    IamPermissionRoleRoleId,
} from '@app/iam/permission-role/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamDeletePermissionRoleByIdCommand)
export class IamDeletePermissionRoleByIdCommandHandler
    implements ICommandHandler<IamDeletePermissionRoleByIdCommand>
{
    constructor(
        private readonly deletePermissionRoleByIdService: IamDeletePermissionRoleByIdService,
    ) {}

    async execute(command: IamDeletePermissionRoleByIdCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.deletePermissionRoleByIdService.main(
            new IamPermissionRolePermissionId(command.permissionId),
            new IamPermissionRoleRoleId(command.roleId),
            command.constraint,
            command.cQMetadata,
        );
    }
}
