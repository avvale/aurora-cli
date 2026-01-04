import { IamAccountResponse } from '@app/iam/account';
import { Operator } from '@aurorajs.dev/core';
import { BadRequestException } from '@nestjs/common';
import * as _ from 'lodash';

// add the tenantId of the current user to the constraint
// of a query to limit the results it has access to
export const TenantConstraint = ({
    targetProperty = 'tenantIds',
    constraintIndex = 2,
    isArray = true,
}: {
    targetProperty?: string; // name of the property to be added to the query
    constraintIndex?: number; // index of the constraint in the arguments
    isArray?: boolean; // if the column is an array
} = {}) => {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        return {
            value(...args: any[]) {
                let account: IamAccountResponse;
                for (const arg of args) {
                    if (
                        typeof arg === 'object' &&
                        arg.constructor.name === 'IamAccountResponse'
                    )
                        account = <IamAccountResponse>arg;
                }

                if (!account)
                    throw new BadRequestException(
                        'To use @TenantConstraint() decorator need has @CurrentAccount() defined in properties of method',
                    );

                if (isArray) {
                    args[constraintIndex] = _.merge(args[constraintIndex], {
                        where: {
                            [targetProperty]: {
                                [Operator.overlap]: account.dTenants,
                            },
                        },
                    });
                } else {
                    const orStatements = [];
                    for (const tenantId of account.dTenants) {
                        orStatements.push({
                            [targetProperty]: tenantId,
                        });
                    }

                    args[constraintIndex] = _.merge(args[constraintIndex], {
                        where: {
                            [Operator.or]: orStatements,
                        },
                    });
                }

                // default behavior, apply 'this' to use current class definition, with inject apply
                const result = descriptor.value.apply(this, args);
                return result;
            },
        };
    };
};
