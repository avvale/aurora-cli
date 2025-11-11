/* eslint-disable key-spacing */
import { IamCreateRolesAccountsCommand } from '@app/iam/role-account';
import { IamCreateRolesAccountsService } from '@app/iam/role-account/application/create/iam-create-roles-accounts.service';
import {
    IamRoleAccountAccountId,
    IamRoleAccountRoleId,
} from '@app/iam/role-account/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamCreateRolesAccountsCommand)
export class IamCreateRolesAccountsCommandHandler
    implements ICommandHandler<IamCreateRolesAccountsCommand>
{
    constructor(
        private readonly createRolesAccountsService: IamCreateRolesAccountsService,
    ) {}

    async execute(command: IamCreateRolesAccountsCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.createRolesAccountsService.main(
            command.payload.map((roleAccount) => {
                return {
                    roleId: new IamRoleAccountRoleId(roleAccount.roleId),
                    accountId: new IamRoleAccountAccountId(
                        roleAccount.accountId,
                    ),
                };
            }),
            command.cQMetadata,
        );
    }
}
