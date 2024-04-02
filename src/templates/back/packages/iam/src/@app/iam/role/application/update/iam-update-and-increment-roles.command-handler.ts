/* eslint-disable key-spacing */
import { IamUpdateAndIncrementRolesCommand } from '@app/iam/role';
import { IamUpdateAndIncrementRolesService } from '@app/iam/role/application/update/iam-update-and-increment-roles.service';
import {
    IamRoleAccountIds,
    IamRoleId,
    IamRoleIsMaster,
    IamRoleName,
    IamRolePermissionIds,
} from '@app/iam/role/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpdateAndIncrementRolesCommand)
export class IamUpdateAndIncrementRolesCommandHandler implements ICommandHandler<IamUpdateAndIncrementRolesCommand>
{
    constructor(
        private readonly updateRolesService: IamUpdateAndIncrementRolesService,
    ) {}

    async execute(command: IamUpdateAndIncrementRolesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateRolesService.main(
            {
                id: new IamRoleId(command.payload.id, { undefinable: true }),
                name: new IamRoleName(command.payload.name, { undefinable: true }),
                isMaster: new IamRoleIsMaster(command.payload.isMaster, { undefinable: true }),
                permissionIds: new IamRolePermissionIds(command.payload.permissionIds),
                accountIds: new IamRoleAccountIds(command.payload.accountIds),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
