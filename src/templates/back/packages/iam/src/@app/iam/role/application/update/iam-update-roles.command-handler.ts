/* eslint-disable key-spacing */
import { IamUpdateRolesCommand } from '@app/iam/role';
import { IamUpdateRolesService } from '@app/iam/role/application/update/iam-update-roles.service';
import {
    IamRoleAccountIds,
    IamRoleId,
    IamRoleIsMaster,
    IamRoleName,
    IamRolePermissionIds,
} from '@app/iam/role/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpdateRolesCommand)
export class IamUpdateRolesCommandHandler
    implements ICommandHandler<IamUpdateRolesCommand>
{
    constructor(private readonly updateRolesService: IamUpdateRolesService) {}

    async execute(command: IamUpdateRolesCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.updateRolesService.main(
            {
                id: new IamRoleId(command.payload.id, { undefinable: true }),
                name: new IamRoleName(command.payload.name, {
                    undefinable: true,
                }),
                isMaster: new IamRoleIsMaster(command.payload.isMaster, {
                    undefinable: true,
                }),
                permissionIds: new IamRolePermissionIds(
                    command.payload.permissionIds,
                ),
                accountIds: new IamRoleAccountIds(command.payload.accountIds),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
