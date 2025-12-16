/* eslint-disable key-spacing */
import { IamCreateRoleCommand } from '@app/iam/role';
import { IamCreateRoleService } from '@app/iam/role/application/create/iam-create-role.service';
import {
    IamRoleAccountIds,
    IamRoleDefaultRedirection,
    IamRoleId,
    IamRoleIsMaster,
    IamRoleName,
    IamRolePermissionIds,
} from '@app/iam/role/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamCreateRoleCommand)
export class IamCreateRoleCommandHandler
    implements ICommandHandler<IamCreateRoleCommand>
{
    constructor(private readonly createRoleService: IamCreateRoleService) {}

    async execute(command: IamCreateRoleCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.createRoleService.main(
            {
                id: new IamRoleId(command.payload.id),
                name: new IamRoleName(command.payload.name),
                defaultRedirection: new IamRoleDefaultRedirection(
                    command.payload.defaultRedirection,
                ),
                isMaster: new IamRoleIsMaster(command.payload.isMaster),
                permissionIds: new IamRolePermissionIds(
                    command.payload.permissionIds,
                ),
                accountIds: new IamRoleAccountIds(command.payload.accountIds),
            },
            command.cQMetadata,
        );
    }
}
