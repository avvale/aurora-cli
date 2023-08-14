import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthApplicationAuthorizationHeader extends StringValueObject
{
    public readonly type: 'OAuthApplicationAuthorizationHeader';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'OAuthApplicationAuthorizationHeader',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}