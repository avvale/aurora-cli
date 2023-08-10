import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthApplicationSecret extends StringValueObject
{
    public readonly type: string = 'OAuthApplicationSecret';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'OAuthApplicationSecret',
            nullable   : false,
            undefinable: false,
            maxLength  : 90,
        }, validationRules));
    }
}