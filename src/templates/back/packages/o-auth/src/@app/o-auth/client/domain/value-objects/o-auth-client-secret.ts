import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthClientSecret extends StringValueObject
{
    public readonly type: string = 'OAuthClientSecret';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'OAuthClientSecret',
            nullable   : false,
            undefinable: false,
            maxLength  : 128,
        }, validationRules));
    }
}