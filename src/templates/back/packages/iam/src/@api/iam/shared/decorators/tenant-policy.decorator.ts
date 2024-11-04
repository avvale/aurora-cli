/* eslint-disable max-len */
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { IamAccountResponse } from '@app/iam/account';
import { Utils } from '@aurorajs.dev/core';

// checks that the tenantId field is present in the received payloads
// and that the value of tenantId sent, the user has access to that tenant
export const TenantPolicy = ({
    targetProperty = 'tenantIds',
    payloadIndex   = 1,
    isArray        = true,
}: {
    targetProperty?: string; // name of the property containing the tenantId in the payload
    payloadIndex?: number;   // index of the payload in the arguments
    isArray?: boolean;       // if the column is an array
} = {}) =>
{
    return (
        target,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) =>
    {
        return {
            value( ...args: any[])
            {
                // get account from arguments
                let account: IamAccountResponse;
                for (const arg of args)
                {
                    if (typeof arg === 'object' && arg.constructor.name === 'IamAccountResponse') account = <IamAccountResponse>arg;
                }

                if (!account) throw new BadRequestException('To use @TenantPolicy() decorator need has @CurrentAccount() defined in properties of method');

                // check if payload has tenantId in array payload
                if (Array.isArray(args[payloadIndex]))
                {
                    for (const item of args[payloadIndex])
                    {
                        if (!item[targetProperty]) throw new BadRequestException(`The ${targetProperty} property not found in payload, maybe has to set payloadIndex or targetProperty arguments of TenantPolicy decorator`);
                        if (isArray)
                        {
                            if (!Utils.arraysIntersects(account.dTenants, item[targetProperty])) throw new UnauthorizedException(`Not allowed operate this item on the tenant ${args[payloadIndex][targetProperty]}, please contact the administrator`);
                        }
                        else
                        {
                            if (account.dTenants.indexOf(item[targetProperty]) === -1) throw new UnauthorizedException(`Not allowed operate this item on the tenant ${args[payloadIndex][targetProperty]}, please contact the administrator`);
                        }
                    }
                }
                // check if payload has tenantId in object payload
                else
                {
                    if (!args[payloadIndex][targetProperty]) throw new BadRequestException(`The ${targetProperty} property not found in payload, maybe has to set payloadIndex or targetProperty arguments of TenantPolicy decorator`);
                    if (isArray)
                    {
                        if (!Utils.arraysIntersects(account.dTenants, args[payloadIndex][targetProperty])) throw new UnauthorizedException(`Not allowed operate this item on the tenant ${args[payloadIndex][targetProperty]}, please contact the administrator`);
                    }
                    else
                    {
                        if (account.dTenants.indexOf(args[payloadIndex][targetProperty]) === -1) throw new UnauthorizedException(`Not allowed operate this item on the tenant ${args[payloadIndex][targetProperty]}, please contact the administrator`);
                    }
                }

                // default behavior, apply 'this' to use current class definition, with inject apply
                const result = descriptor.value.apply(this, args);
                return result;
            },
        };
    };
};