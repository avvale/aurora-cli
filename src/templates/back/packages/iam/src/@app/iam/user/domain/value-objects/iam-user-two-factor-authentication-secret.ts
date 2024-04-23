import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamUserTwoFactorAuthenticationSecret extends StringValueObject
{
    public readonly type: string = 'IamUserTwoFactorAuthenticationSecret';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'IamUserTwoFactorAuthenticationSecret',
            nullable   : true,
            undefinable: true,
            maxLength  : 16,
        }, validationRules));
    }
}