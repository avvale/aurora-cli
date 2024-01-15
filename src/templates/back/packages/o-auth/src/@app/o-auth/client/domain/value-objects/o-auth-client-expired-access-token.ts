import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthClientExpiredAccessToken extends IntValueObject
{
    public readonly type: string = 'OAuthClientExpiredAccessToken';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'OAuthClientExpiredAccessToken',
            nullable   : true,
            undefinable: true,
            unsigned   : true,
        }, validationRules));
    }
}