/* eslint-disable max-len */
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { IamAccountResponse } from '@app/iam/account';

// checks that the tenantId field is present in the received payloads
// and that the value of tenantId sent, the user has access to that tenant
export const TenantPolicy = (customProperties?: {
    targetProperty: string; // name of the property containing the tenantId in the payload
    payloadIndex: number;    // index of the payload in the arguments
}) =>
{
    return (
        target,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) =>
    {
        return {
            value( ... args: any[])
            {
                const properties = Object.assign({}, {
                    targetProperty: 'tenantId',
                    payloadIndex  : 1,
                }, customProperties);

                // get account from arguments
                let account: IamAccountResponse;
                for (const arg of args)
                {
                    if (typeof arg === 'object' && arg.constructor.name === 'AccountResponse') account = <IamAccountResponse>arg;
                }

                if (!account) throw new BadRequestException('To use @TenantPolicy() decorator need has @CurrentAccount() defined in properties of method');

                // check if payload has tenantId in array payload
                if (Array.isArray(args[properties.payloadIndex]))
                {
                    for (const item of args[properties.payloadIndex])
                    {
                        if (!item[properties.targetProperty]) throw new BadRequestException('TenantId not found in payload, maybe has to set payloadIndex or targetProperty arguments of TenantPolicy decorator');
                        if (account.dTenants.indexOf(item[properties.targetProperty]) === -1) throw new UnauthorizedException(`Not allowed create this item on the tenant ${args[properties.payloadIndex][properties.targetProperty]}, please contact the administrator`);
                    }
                }
                // check if payload has tenantId in object payload
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