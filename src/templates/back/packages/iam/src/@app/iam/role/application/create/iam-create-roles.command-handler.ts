/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamCreateRolesCommand } from './iam-create-roles.command';
import { IamCreateRolesService } from './iam-create-roles.service';
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

@CommandHandler(IamCreateRolesCommand)
export class IamCreateRolesCommandHandler implements ICommandHandler<IamCreateRolesCommand>
{
    constructor(
        private readonly createRolesService: IamCreateRolesService,
    ) {}

    async execute(command: IamCreateRolesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createRolesService.main(
            command.payload
                .map(role =>
                {
                    return {
                        id: new IamRoleId(role.id),
                        name: new IamRoleName(role.name),
                        isMaster: new IamRoleIsMaster(role.isMaster),
                        permissionIds: new IamRolePermissionIds(role.permissionIds),
                        accountIds: new IamRoleAccountIds(role.accountIds),
                    };
                }),
            command.cQMetadata,
        );
    }
}
