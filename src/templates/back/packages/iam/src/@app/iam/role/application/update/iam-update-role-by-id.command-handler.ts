/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamUpdateRoleByIdCommand } from './iam-update-role-by-id.command';
import { IamUpdateRoleByIdService } from './iam-update-role-by-id.service';
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

@CommandHandler(IamUpdateRoleByIdCommand)
export class IamUpdateRoleByIdCommandHandler implements ICommandHandler<IamUpdateRoleByIdCommand>
{
    constructor(
        private readonly updateRoleByIdService: IamUpdateRoleByIdService,
    ) {}

    async execute(command: IamUpdateRoleByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateRoleByIdService.main(
            {
                id: new IamRoleId(command.payload.id),
                name: new IamRoleName(command.payload.name, { undefinable: true }),
                isMaster: new IamRoleIsMaster(command.payload.isMaster, { undefinable: true }),
                permissionIds: new IamRolePermissionIds(command.payload.permissionIds),
                accountIds: new IamRoleAccountIds(command.payload.accountIds),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
