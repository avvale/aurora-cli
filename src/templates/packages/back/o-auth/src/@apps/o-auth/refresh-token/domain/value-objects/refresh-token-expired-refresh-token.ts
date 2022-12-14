import { IntValueObject, ValidationRules } from '@aurora-ts/core';

export class RefreshTokenExpiredRefreshToken extends IntValueObject
{
    public readonly type: 'RefreshTokenExpiredRefreshToken';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'RefreshTokenExpiredRefreshToken',
            nullable   : true,
            undefinable: true,
            maxLength  : 10,
            unsigned   : true,
        }, validationRules));
    }
}