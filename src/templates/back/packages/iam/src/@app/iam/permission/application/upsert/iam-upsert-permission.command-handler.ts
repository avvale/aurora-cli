/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamUpsertPermissionCommand } from './iam-upsert-permission.command';
import { IamUpsertPermissionService } from './iam-upsert-permission.service';
import {
    IamPermissionId,
    IamPermissionName,
    IamPermissionBoundedContextId,
    IamPermissionRoleIds,
    IamPermissionCreatedAt,
    IamPermissionUpdatedAt,
    IamPermissionDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(IamUpsertPermissionCommand)
export class IamUpsertPermissionCommandHandler implements ICommandHandler<IamUpsertPermissionCommand>
{
    constructor(
        private readonly upsertPermissionService: IamUpsertPermissionService,
    ) {}

    async execute(command: IamUpsertPermissionCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertPermissionService.main(
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
