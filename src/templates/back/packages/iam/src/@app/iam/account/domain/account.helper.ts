import { CQMetadata, ICommandBus, QueryStatement } from '@aurora-ts/core';
import { AccountResponse } from './account.response';
import { UpdateAccountByIdCommand } from '../application/update/update-account-by-id.command';

export class AccountHelper
{
    // TODO, revisar esta función donde se usa y llevarla a application/service en @app
    public static async deleteTenantFromAccounts(
        commandBus: ICommandBus,
        tenantId: string,
        accounts: AccountResponse[],
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        for (const account of accounts)
        {
            // check that tenant exist in account
            if (account.dTenants.indexOf(tenantId) !== -1)
            {
                const currentTenants = account.dTenants;

                // TODO revisar esto, hacer la operación en solo un update
                // delete tenant and update account
                // eslint-disable-next-line no-await-in-loop
                await commandBus.dispatch(
                    new UpdateAccountByIdCommand(
                        {
                            id               : account.id,
                            type             : undefined,
                            email            : undefined,
                            isActive         : undefined,
                            clientId         : undefined,
                            dApplicationCodes: undefined,
                            dPermissions     : undefined,
                            meta             : undefined,
                            roleIds          : undefined,
                            tenantIds        : currentTenants.filter(tenantId => tenantId !== tenantId),
                        },
                        constraint,
                        cQMetadata,
                    ));
            }
        }
    }
}