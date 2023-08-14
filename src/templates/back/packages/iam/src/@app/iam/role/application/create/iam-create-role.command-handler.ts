/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamCreateRoleCommand } from './iam-create-role.command';
import { IamCreateRoleService } from './iam-create-role.service';
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

@CommandHandler(IamCreateRoleCommand)
export class IamCreateRoleCommandHandler implements ICommandHandler<IamCreateRoleCommand>
{
    constructor(
        private readonly createRoleService: IamCreateRoleService,
    ) {}

    async execute(command: IamCreateRoleCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createRoleService.main(
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
