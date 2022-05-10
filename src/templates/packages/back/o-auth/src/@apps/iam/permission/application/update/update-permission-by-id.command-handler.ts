/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePermissionByIdCommand } from './update-permission-by-id.command';
import { UpdatePermissionByIdService } from './update-permission-by-id.service';
import {
    PermissionId,
    PermissionName,
    PermissionBoundedContextId,
    PermissionRoleIds,
    PermissionCreatedAt,
    PermissionUpdatedAt,
    PermissionDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpdatePermissionByIdCommand)
export class UpdatePermissionByIdCommandHandler implements ICommandHandler<UpdatePermissionByIdCommand>
{
    constructor(
        private readonly updatePermissionByIdService: UpdatePermissionByIdService,
    ) {}

    async execute(command: UpdatePermissionByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updatePermissionByIdService.main(
            {
                id: new PermissionId(command.payload.id),
                name: new PermissionName(command.payload.name, { undefinable: true }),
                boundedContextId: new PermissionBoundedContextId(command.payload.boundedContextId, { undefinable: true }),
                roleIds: new PermissionRoleIds(command.payload.roleIds),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}