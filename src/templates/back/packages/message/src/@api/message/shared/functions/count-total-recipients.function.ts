import { IamCountAccountQuery } from '@app/iam/account';
import { IQueryBus, Operator } from '@aurorajs.dev/core';

export const countTotalRecipients = async ({
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
}): Promise<number> => {
  const where: any = {};
  const whereAnd: any = [];

  // query messages for tenants that account belongs to
  if (Array.isArray(tenantRecipientIds) && tenantRecipientIds.length > 0) {
    whereAnd.push({
      dTenants: {
        [Operator.overlap]: tenantRecipientIds,
      },
    });
  }

  // query messages for scopes that account belongs to
  if (Array.isArray(scopeRecipients) && scopeRecipients.length > 0) {
    whereAnd.push({
      scopes: {
        [Operator.overlap]: scopeRecipients,
      },
    });
  }

  // query messages for tags that account belongs to
  if (Array.isArray(tagRecipients) && tagRecipients.length > 0) {
    whereAnd.push({
      tags: {
        [Operator.overlap]: tagRecipients,
      },
    });
  }

  // checks if there is an element in whereAnd to add it to where
  if (whereAnd.length > 0) {
    if (!where[Operator.or]) where[Operator.or] = [];

    where[Operator.or].push({
      [Operator.and]: whereAnd,
    });
  }

  // checks if there are specific accounts to add and adds them to the OR
  if (Array.isArray(accountRecipientIds) && accountRecipientIds.length > 0) {
    if (!where[Operator.or]) where[Operator.or] = [];

    where[Operator.or].push({
      id: {
        [Operator.in]: accountRecipientIds || [],
      },
    });
  }

  /*
    {
        [Operator.or]: [
            {
                [Operator.and]: [
                    {
                        dTenants: {
                            [Operator.overlap]: tenantRecipientIds,
                        },
                    },
                    {
                        scopes: {
                            [Operator.overlap]: scopeRecipients,
                        },
                    },
                    {
                        tags: {
                            [Operator.overlap]: tagRecipients,
                        },
                    },
                ],
            },
            {
                id: {
                    [Operator.in]: accountRecipientIds || [],
                },
            },
        ],
    }
    */
  return await queryBus.ask(new IamCountAccountQuery({ where }));
};
