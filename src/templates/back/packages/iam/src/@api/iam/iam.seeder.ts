// ignored file
import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { accounts, boundedContexts, permissions, roles, users } from '@app/iam/iam.seed';

// sources
import { BoundedContextHelper } from '@app/iam/bounded-context/domain/bounded-context-helper';
import { PermissionHelper } from '@app/iam/permission/domain/permission-helper';
import { FindAccountByIdQuery } from '@app/iam/account/application/find/find-account-by-id.query';
import { CreateAccountsCommand } from '@app/iam/account/application/create/create-accounts.command';
import { CreateUsersCommand } from '@app/iam/user/application/create/create-users.command';
import { CreateRolesCommand } from '@app/iam/role/application/create/create-roles.command';
import { CreateRolesAccountsCommand } from '@app/iam/role/application/create/create-roles-accounts.command';
import { IamAccount } from '@app/iam/account/domain/account.aggregate';

@Injectable()
export class IamSeeder
{
    administratorAccount: IamAccount;

    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        try
        {
            this.administratorAccount = await this.queryBus.ask(new FindAccountByIdQuery(PermissionHelper.administratorAccountId));
        }
        catch (error)
        {
            // avoid error 404
            if (error.response.statusCode === 404) { /**/ }
        }

        if (this.administratorAccount)
        {
            // create bounded contexts and permissions
            await BoundedContextHelper.createBoundedContexts(this.commandBus, boundedContexts);
            await PermissionHelper.createPermissions(this.commandBus, this.queryBus, permissions);
        }
        else
        {
            await this.commandBus.dispatch(new CreateAccountsCommand(accounts));
            await this.commandBus.dispatch(new CreateUsersCommand(users));
            await this.commandBus.dispatch(new CreateRolesCommand(roles));

            // set all roles to administration account
            const rolesAccounts = roles.map(role =>
            {
                return {
                    roleId   : role.id,
                    accountId: PermissionHelper.administratorAccountId,
                };
            });
            await this.commandBus.dispatch(new CreateRolesAccountsCommand(rolesAccounts));

            // create bounded contexts and permissions
            await BoundedContextHelper.createBoundedContexts(this.commandBus, boundedContexts);
            await PermissionHelper.createPermissions(this.commandBus, this.queryBus, permissions);
        }

        return true;
    }
}