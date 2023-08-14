// ignored file
import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { accounts, boundedContexts, permissions, roles, users } from '@app/iam/iam.seed';

// sources
import { IamBoundedContextHelper } from '@app/iam/bounded-context';
import { IamPermissionHelper } from '@app/iam/permission';
import { IamAccount, IamCreateAccountsCommand, IamFindAccountByIdQuery } from '@app/iam/account';
import { IamCreateUsersCommand } from '@app/iam/user';
import { IamCreateRolesCommand, IamCreateRolesAccountsCommand } from '@app/iam/role';

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
            this.administratorAccount = await this.queryBus.ask(
                new IamFindAccountByIdQuery(
                    IamPermissionHelper.administratorAccountId,
                ),
            );
        }
        catch (error)
        {
            // avoid error 404
            if (error.response.statusCode === 404) { /**/ }
        }

        if (this.administratorAccount)
        {
            // create bounded contexts and permissions
            await IamBoundedContextHelper.createBoundedContexts(this.commandBus, boundedContexts);
            await IamPermissionHelper.createPermissions(this.commandBus, this.queryBus, permissions);
        }
        else
        {
            await this.commandBus.dispatch(new IamCreateAccountsCommand(accounts));
            await this.commandBus.dispatch(new IamCreateUsersCommand(users));
            await this.commandBus.dispatch(new IamCreateRolesCommand(roles));

            // set all roles to administration account
            const rolesAccounts = roles.map(role =>
            {
                return {
                    roleId   : role.id,
                    accountId: IamPermissionHelper.administratorAccountId,
                };
            });
            await this.commandBus.dispatch(new IamCreateRolesAccountsCommand(rolesAccounts));

            // create bounded contexts and permissions
            await IamBoundedContextHelper.createBoundedContexts(this.commandBus, boundedContexts);
            await IamPermissionHelper.createPermissions(this.commandBus, this.queryBus, permissions);
        }

        return true;
    }
}