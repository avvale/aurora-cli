import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthCredentialClientSecret extends StringValueObject
{
    public readonly type: string = 'OAuthCredentialClientSecret';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'OAuthCredentialClientSecret',
            nullable   : true,
            undefinable: true,
            maxLength  : 128,
        }, validationRules));
    }
}