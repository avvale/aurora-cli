// ignored file
import {
    accounts,
    boundedContexts,
    permissions,
    roles,
    tenants,
    users,
} from '@app/iam/iam.seed';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

// sources
import {
    IamAccount,
    IamCreateAccountsCommand,
    IamFindAccountByIdQuery,
} from '@app/iam/account';
import { IamCreateBoundedContextsCommand } from '@app/iam/bounded-context';
import {
    IamCreatePermissionsCommand,
    IamPermissionHelper,
} from '@app/iam/permission';
import { IamCreateRolesCommand } from '@app/iam/role';
import { IamCreateRolesAccountsCommand } from '@app/iam/role-account';
import { IamCreateTenantsCommand } from '@app/iam/tenant';
import { IamCreateUsersCommand } from '@app/iam/user';

@Injectable()
export class IamSeeder implements OnApplicationBootstrap {
    administratorAccount: IamAccount;

    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean> {
        this.administratorAccount = await this.queryBus.ask(
            new IamFindAccountByIdQuery(
                IamPermissionHelper.administratorAccountId,
            ),
        );

        if (this.administratorAccount) {
            // create bounded contexts and permissions
            await IamPermissionHelper.createAdministratorPermissions(
                this.commandBus,
                this.queryBus,
                permissions,
            );
        } else {
            await this.commandBus.dispatch(
                new IamCreateTenantsCommand(tenants),
            );
            await this.commandBus.dispatch(
                new IamCreateAccountsCommand(accounts),
            );
            await this.commandBus.dispatch(new IamCreateUsersCommand(users));
            await this.commandBus.dispatch(new IamCreateRolesCommand(roles));

            // set all roles to administration account
            const rolesAccounts = roles.map((role) => {
                return {
                    roleId: role.id,
                    accountId: IamPermissionHelper.administratorAccountId,
                };
            });
            await this.commandBus.dispatch(
                new IamCreateRolesAccountsCommand(rolesAccounts),
            );

            // create administrator permissions
            await IamPermissionHelper.createAdministratorPermissions(
                this.commandBus,
                this.queryBus,
                permissions,
            );
        }

        return true;
    }

    async onApplicationBootstrap(): Promise<void> {
        await this.commandBus.dispatch(
            new IamCreateBoundedContextsCommand(boundedContexts, {
                timezone: process.env.TZ,
                repositoryOptions: {
                    updateOnDuplicate: ['name', 'root', 'sort', 'isActive'],
                    conflictAttributes: ['id'],
                },
            }),
        );
        void this.commandBus.dispatch(
            new IamCreatePermissionsCommand(permissions, {
                timezone: process.env.TZ,
                repositoryOptions: {
                    updateOnDuplicate: ['name', 'boundedContextId'],
                    conflictAttributes: ['id'],
                },
            }),
        );
    }
}
