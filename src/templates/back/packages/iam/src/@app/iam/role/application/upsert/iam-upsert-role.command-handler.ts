/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamUpsertRoleCommand } from './iam-upsert-role.command';
import { IamUpsertRoleService } from './iam-upsert-role.service';
import {
    IamRoleId,
    IamRoleName,
    IamRoleIsMaster,
    IamRolePermissionIds,
    IamRoleAccountIds,
    IamRoleCreatedAt,
    IamRoleUpdatedAt,
    IamRoleDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(IamUpsertRoleCommand)
export class IamUpsertRoleCommandHandler implements ICommandHandler<IamUpsertRoleCommand>
{
    constructor(
        private readonly upsertRoleService: IamUpsertRoleService,
    ) {}

    async execute(command: IamUpsertRoleCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertRoleService.main(
            {
                id: new IamRoleId(command.payload.id),
                name: new IamRoleName(command.payload.name),
                isMaster: new IamRoleIsMaster(command.payload.isMaster),
                permissionIds: new IamRolePermissionIds(command.payload.permissionIds),
                accountIds: new IamRoleAccountIds(command.payload.accountIds),
            },
            command.cQMetadata,
        );
    }
}
