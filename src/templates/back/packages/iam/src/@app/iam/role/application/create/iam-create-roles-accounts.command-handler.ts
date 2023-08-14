import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamCreateRolesAccountsCommand } from './iam-create-roles-accounts.command';
import { IamCreateRolesAccountsService } from './iam-create-roles-accounts.service';
import {
    IamRoleRoleId,
    IamRoleAccountId,

} from '../../domain/value-objects';

@CommandHandler(IamCreateRolesAccountsCommand)
export class IamCreateRolesAccountsCommandHandler implements ICommandHandler<IamCreateRolesAccountsCommand>
{
    constructor(
        private readonly createRolesAccountsService: IamCreateRolesAccountsService,
    ) { }

    async execute(command: IamCreateRolesAccountsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createRolesAccountsService.main(
            command.rolesAccounts
                .map(permission =>
                {
                    return {
                        roleId   : new IamRoleRoleId(permission.roleId),
                        accountId: new IamRoleAccountId(permission.accountId),
                    };
                }),
        );
    }
}