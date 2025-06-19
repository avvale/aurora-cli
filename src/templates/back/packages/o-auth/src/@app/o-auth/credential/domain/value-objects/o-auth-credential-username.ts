import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthCredentialUsername extends StringValueObject
{
    public readonly type: string = 'OAuthCredentialUsername';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'OAuthCredentialUsername',
            nullable   : true,
            undefinable: true,
            maxLength  : 128,
        }, validationRules));
    }
}