import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePermissionRoleByIdCommand } from './delete-permission-role-by-id.command';
import { DeletePermissionRoleByIdService } from './delete-permission-role-by-id.service';
import {
    PermissionRolePermissionId,
    PermissionRoleRoleId,
} from '../../domain/value-objects';

@CommandHandler(DeletePermissionRoleByIdCommand)
export class DeletePermissionRoleByIdCommandHandler implements ICommandHandler<DeletePermissionRoleByIdCommand>
{
    constructor(
        private readonly deletePermissionRoleByIdService: DeletePermissionRoleByIdService,
    ) {}

    async execute(command: DeletePermissionRoleByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deletePermissionRoleByIdService.main(
            new PermissionRolePermissionId(command.payload.permissionId),
            new PermissionRoleRoleId(command.payload.roleId),
            command.constraint,
            command.cQMetadata,
        );
    }
}