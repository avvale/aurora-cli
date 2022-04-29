import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRolesAccountsCommand } from './create-roles-accounts.command';
import { CreateRolesAccountsService } from './create-roles-accounts.service';
import {
    RoleRoleId,
    RoleAccountId,

} from './../../domain/value-objects';

@CommandHandler(CreateRolesAccountsCommand)
export class CreateRolesAccountsCommandHandler implements ICommandHandler<CreateRolesAccountsCommand>
{
    constructor(
        private readonly createRolesAccountsService: CreateRolesAccountsService,
    ) { }

    async execute(command: CreateRolesAccountsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createRolesAccountsService.main(
            command.rolesAccounts
                .map(permission =>
                {
                    return {
                        roleId   : new RoleRoleId(permission.roleId),
                        accountId: new RoleAccountId(permission.accountId),
                    };
                }),
        );
    }
}