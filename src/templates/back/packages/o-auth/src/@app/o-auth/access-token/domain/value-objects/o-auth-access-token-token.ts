import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthAccessTokenToken extends StringValueObject
{
    public readonly type: string = 'OAuthAccessTokenToken';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'OAuthAccessTokenToken',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}