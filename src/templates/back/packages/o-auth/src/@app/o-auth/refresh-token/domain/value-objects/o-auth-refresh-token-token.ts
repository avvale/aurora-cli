import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthRefreshTokenToken extends StringValueObject
{
    public readonly type: string = 'OAuthRefreshTokenToken';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'OAuthRefreshTokenToken',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}