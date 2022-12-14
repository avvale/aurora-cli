import { IntValueObject, ValidationRules } from '@aurora-ts/core';

export class AccessTokenExpiredAccessToken extends IntValueObject
{
    public readonly type: 'AccessTokenExpiredAccessToken';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AccessTokenExpiredAccessToken',
            nullable   : true,
            undefinable: true,
            maxLength  : 10,
            unsigned   : true,
        }, validationRules));
    }
}