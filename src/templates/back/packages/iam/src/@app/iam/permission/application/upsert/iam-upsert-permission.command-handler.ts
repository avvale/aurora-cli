/* eslint-disable key-spacing */
import { IamUpsertPermissionCommand } from '@app/iam/permission';
import { IamUpsertPermissionService } from '@app/iam/permission/application/upsert/iam-upsert-permission.service';
import {
    IamPermissionBoundedContextId,
    IamPermissionId,
    IamPermissionName,
    IamPermissionRoleIds,
} from '@app/iam/permission/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
