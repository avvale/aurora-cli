import { NestFactory } from '@nestjs/core';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';
import { SeederModule } from './seeder.module';

// sources
import { boundedContexts } from '../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';
import { permissions } from '../../../@apps/iam/permission/infrastructure/seeds/permission.seed';
import { BoundedContextHelper } from '../../../@apps/iam/bounded-context/domain/bounded-context-helper';
import { PermissionHelper } from '../../../@apps/iam/permission/domain/permission-helper';
import { FindAccountByIdQuery } from '../../../@apps/iam/account/application/find/find-account-by-id.query';
import { CreateAccountsCommand } from '../../../@apps/iam/account/application/create/create-accounts.command';
import { accounts } from '../../../@apps/iam/account/infrastructure/seeds/account.seed';
import { CreateUsersCommand } from '../../../@apps/iam/user/application/create/create-users.command';
import { users } from '../../../@apps/iam/user/infrastructure/seeds/user.seed';
import { CreateRolesCommand } from '../../../@apps/iam/role/application/create/create-roles.command';
import { CreateRolesAccountsCommand } from '../../../@apps/iam/role/application/create/create-roles-accounts.command';
import { roles } from '../../../@apps/iam/role/infrastructure/seeds/role.seed';

export class Seeder
{
    main(): void
    {
        NestFactory.createApplicationContext(SeederModule).then(async appContext =>
        {
            const commandBus            = appContext.get(ICommandBus);
            const queryBus              = appContext.get(IQueryBus);
            let administratorAccount    = null;

            try
            {
                administratorAccount  = await queryBus.ask(new FindAccountByIdQuery(PermissionHelper.administratorAccountId));
            }
            catch (error)
            {
                // avoid error 404
                if (error.response.statusCode === 404) { /**/ }
            }

            if (administratorAccount)
            {
                // create bounded contexts and permissions
                await BoundedContextHelper.createBoundedContexts(commandBus, boundedContexts);
                await PermissionHelper.createPermissions(commandBus, queryBus, permissions);
            }
            else
            {
                await commandBus.dispatch(new CreateAccountsCommand(accounts));
                await commandBus.dispatch(new CreateUsersCommand(users));

                await commandBus.dispatch(new CreateRolesCommand(roles));

                // set all roles to administration account
                const rolesAccounts = roles.map(role =>
                {
                    return {
                        roleId   : role.id,
                        accountId: PermissionHelper.administratorAccountId,
                    };
                });
                await commandBus.dispatch(new CreateRolesAccountsCommand(rolesAccounts));

                // create bounded contexts and permissions
                await BoundedContextHelper.createBoundedContexts(commandBus, boundedContexts);
                await PermissionHelper.createPermissions(commandBus, queryBus, permissions);
            }
        });
    }
}
new Seeder().main();