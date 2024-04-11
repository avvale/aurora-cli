import { IamCountAccountQuery } from '@app/iam/account';
import { IQueryBus, Operator } from '@aurorajs.dev/core';

export const countTotalRecipients = async(
    {
        queryBus,
        tenantRecipientIds,
        scopeRecipients,
        tagRecipients,
        accountRecipientIds,
    }: {
        queryBus: IQueryBus;
        tenantRecipientIds: string[];
        scopeRecipients: string[];
        tagRecipients: string[];
        accountRecipientIds: string[];
    },
): Promise<number> =>
{
    return await queryBus.ask(new IamCountAccountQuery(
        {
            where: {
                [Operator.or]: [
                    {
                        // query messages for tenants that account belongs to
                        dTenants: {
                            [Operator.overlap]: tenantRecipientIds,
                        },
                    },
                    {
                        // query messages for scopes that account belongs to
                        scopes: {
                            [Operator.overlap]: scopeRecipients,
                        },
                    },
                    {
                        // query messages for tags that account belongs to
                        tags: {
                            [Operator.overlap]: tagRecipients,
                        },
                    },
                    {
                        // query messages for account
                        id: {
                            [Operator.in]: accountRecipientIds || [],
                        },
                    },
                ],
            },
        },
    ));
};