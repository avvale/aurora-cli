import { BadRequestException } from '@nestjs/common';
import { Operator } from '@aurorajs.dev/core';
import { IamAccountResponse } from '@app/iam/account';
import * as _ from 'lodash';

// add the tenantId of the current user to the constraint
// of a query to limit the results it has access to
export const TenantConstraint = (customProperties?: {
    targetProperty: string;     // name of the property to be added to the query
    constraintIndex: number;    // index of the constraint in the arguments
}) =>
{
    return (target, propertyKey: string, descriptor: PropertyDescriptor) =>
    {
        return {
            value( ... args: any[])
            {
                const properties = Object.assign({}, {
                    targetProperty : 'tenantId',
                    constraintIndex: 2,
                }, customProperties);

                let account: IamAccountResponse;
                for (const arg of args)
                {
                    if (typeof arg === 'object' && arg.constructor.name === 'AccountResponse') account = <IamAccountResponse>arg;
                }

                if (!account) throw new BadRequestException('To use @TenantConstraint() decorator need has @CurrentAccount() defined in properties of method');

                const orStatements = [];
                for (const tenantId of account.dTenants)
                {
                    orStatements.push({ tenantId });
                }

                args[properties.constraintIndex] = _.merge(args[properties.constraintIndex], {
                    where: {
                        [Operator.or]: orStatements,
                    },
                });

                // default behavior, apply 'this' to use current class definition, with inject apply
                const result = descriptor.value.apply(this, args);
                return result;
            },
        };
    };
};