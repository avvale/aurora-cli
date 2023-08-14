import { IamDeletePermissionRoleByIdCommand } from '@app/iam/permission-role';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
    IamPermissionRolePermissionId,
    IamPermissionRoleRoleId,
} from '../../domain/value-objects';
import { IamDeletePermissionRoleByIdService } from './iam-delete-permission-role-by-id.service';

@CommandHandler(IamDeletePermissionRoleByIdCommand)
export class IamDeletePermissionRoleByIdCommandHandler implements ICommandHandler<IamDeletePermissionRoleByIdCommand>
{
    constructor(
        private readonly deletePermissionRoleByIdService: IamDeletePermissionRoleByIdService,
    ) {}

    async execute(command: IamDeletePermissionRoleByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deletePermissionRoleByIdService.main(
            new IamPermissionRolePermissionId(command.payload.permissionId),
            new IamPermissionRoleRoleId(command.payload.roleId),
            command.constraint,
            command.cQMetadata,
        );
    }
}