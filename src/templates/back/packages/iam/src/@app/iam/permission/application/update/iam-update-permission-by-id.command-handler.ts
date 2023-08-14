/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamUpdatePermissionByIdCommand } from './iam-update-permission-by-id.command';
import { IamUpdatePermissionByIdService } from './iam-update-permission-by-id.service';
import {
    IamPermissionId,
    IamPermissionName,
    IamPermissionBoundedContextId,
    IamPermissionRoleIds,
    IamPermissionCreatedAt,
    IamPermissionUpdatedAt,
    IamPermissionDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(IamUpdatePermissionByIdCommand)
export class IamUpdatePermissionByIdCommandHandler implements ICommandHandler<IamUpdatePermissionByIdCommand>
{
    constructor(
        private readonly updatePermissionByIdService: IamUpdatePermissionByIdService,
    ) {}

    async execute(command: IamUpdatePermissionByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updatePermissionByIdService.main(
            {
                id: new IamPermissionId(command.payload.id),
                name: new IamPermissionName(command.payload.name, { undefinable: true }),
                boundedContextId: new IamPermissionBoundedContextId(command.payload.boundedContextId, { undefinable: true }),
                roleIds: new IamPermissionRoleIds(command.payload.roleIds),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
