/* eslint-disable key-spacing */
import { IamUpsertRoleCommand } from '@app/iam/role';
import { IamUpsertRoleService } from '@app/iam/role/application/upsert/iam-upsert-role.service';
import {
    IamRoleAccountIds,
    IamRoleId,
    IamRoleIsMaster,
    IamRoleName,
    IamRolePermissionIds,
} from '@app/iam/role/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
