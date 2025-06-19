import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthCredentialRefreshToken extends StringValueObject
{
    public readonly type: string = 'OAuthCredentialRefreshToken';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'OAuthCredentialRefreshToken',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}