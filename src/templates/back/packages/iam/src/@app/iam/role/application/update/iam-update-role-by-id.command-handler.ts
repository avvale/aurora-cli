/* eslint-disable key-spacing */
import { IamUpdateRoleByIdCommand } from '@app/iam/role';
import { IamUpdateRoleByIdService } from '@app/iam/role/application/update/iam-update-role-by-id.service';
import {
    IamRoleAccountIds,
    IamRoleId,
    IamRoleIsMaster,
    IamRoleName,
    IamRolePermissionIds,
} from '@app/iam/role/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpdateRoleByIdCommand)
export class IamUpdateRoleByIdCommandHandler
    implements ICommandHandler<IamUpdateRoleByIdCommand>
{
    constructor(
        private readonly updateRoleByIdService: IamUpdateRoleByIdService,
    ) {}

    async execute(command: IamUpdateRoleByIdCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.updateRoleByIdService.main(
            {
                id: new IamRoleId(command.payload.id),
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
            command.constraint,
            command.cQMetadata,
        );
    }
}
