import { BadRequestException } from '@nestjs/common';
import { Operator } from '@aurorajs.dev/core';
import { IamAccountResponse } from '@app/iam/account';
import * as _ from 'lodash';

export const TenantConstraint = (customProperties?: {
    targetProperty: string;
    constraintIndex: number;
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