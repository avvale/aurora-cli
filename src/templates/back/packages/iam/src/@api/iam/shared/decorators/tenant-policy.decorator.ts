import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AccountResponse } from '@app/iam/account/domain/account.response';

export const TenantPolicy = (customProperties?: {
    targetProperty: string;
    payloadIndex: number;
}) =>
{
    return (target, propertyKey: string, descriptor: PropertyDescriptor) =>
    {
        return {
            value( ... args: any[])
            {
                const properties = Object.assign({}, {
                    targetProperty: 'tenantId',
                    payloadIndex  : 1,
                }, customProperties);

                // get account from arguments
                let account: AccountResponse;
                for (const arg of args)
                {
                    if (typeof arg === 'object' && arg.constructor.name === 'AccountResponse') account = <AccountResponse>arg;
                }

                if (!account) throw new BadRequestException('To use @TenantPolicy() decorator need has @CurrentAccount() defined in properties of method');

                if (Array.isArray(args[properties.payloadIndex]))
                {
                    for (const item of args[properties.payloadIndex])
                    {
                        if (!item[properties.targetProperty]) throw new BadRequestException('TenantId not found in payload, maybe has to set payloadIndex or targetProperty arguments of TenantPolicy decorator');
                        if (account.dTenants.indexOf(item[properties.targetProperty]) === -1) throw new UnauthorizedException(`Not allowed create this item on the tenant ${args[properties.payloadIndex][properties.targetProperty]}, please contact the administrator`);
                    }
                }
                else
                {
                    if (!args[properties.payloadIndex][properties.targetProperty]) throw new BadRequestException('TenantId not found in payload, maybe has to set payloadIndex or targetProperty arguments of TenantPolicy decorator');
                    if (account.dTenants.indexOf(args[properties.payloadIndex][properties.targetProperty]) === -1) throw new UnauthorizedException(`Not allowed create this item on the tenant ${args[properties.payloadIndex][properties.targetProperty]}, please contact the administrator`);
                }

                // default behavior, apply 'this' to use current class definition, with inject apply
                const result = descriptor.value.apply(this, args);
                return result;
            },
        };
    };
};