import { CQMetadata, ICommandBus, QueryStatement } from '@aurorajs.dev/core';
import { IamAccountResponse } from './iam-account.response';
import { IamUpdateAccountByIdCommand } from '../application/update/iam-update-account-by-id.command';

export class IamAccountHelper
{
    // TODO, revisar esta función donde se usa y llevarla a application/service en @app
    public static async deleteTenantFromAccounts(
        commandBus: ICommandBus,
        tenantId: string,
        accounts: IamAccountResponse[],
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
                    new IamUpdateAccountByIdCommand(
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