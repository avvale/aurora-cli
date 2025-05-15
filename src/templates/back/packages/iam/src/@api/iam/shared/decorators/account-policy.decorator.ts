/* eslint-disable max-len */
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { IamAccountResponse } from '@app/iam/account';

// checks that the accountId field is present in the received payloads
// and that the value of accountId sent, the user has access to that account
export const AccountPolicy = ({
    targetProperty = 'accountId',
    payloadIndex   = 1,
    isArray        = false,
}: {
    targetProperty?: string; // name of the property containing the accountId in the payload
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

                if (!account) throw new BadRequestException('To use @AccountPolicy() decorator need has @CurrentAccount() defined in properties of method');

                // always manage array of payloads
                const payload = Array.isArray(args[payloadIndex]) ? args[payloadIndex] : [args[payloadIndex]];

                for (const item of payload)
                {
                    if (!item[targetProperty]) throw new BadRequestException(`The ${targetProperty} property not found in payload, maybe has to set payloadIndex or targetProperty arguments of AccountPolicy decorator`);
                    if (isArray)
                    {
                        if (item[targetProperty].indexOf(account.id) === -1) throw new UnauthorizedException(`Not allowed operate this item on account ${args[payloadIndex][targetProperty]}, please contact the administrator`);
                    }
                    else
                    {
                        if (item[targetProperty] !== account.id) throw new UnauthorizedException(`Not allowed operate this item on account ${args[payloadIndex][targetProperty]}, please contact the administrator`);
                    }
                }

                // default behavior, apply 'this' to use current class definition, with inject apply
                const result = descriptor.value.apply(this, args);
                return result;
            },
        };
    };
};