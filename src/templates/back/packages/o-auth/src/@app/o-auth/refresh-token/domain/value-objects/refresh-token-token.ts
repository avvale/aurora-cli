import { StringValueObject, ValidationRules } from '@aurora-ts/core';

export class RefreshTokenToken extends StringValueObject
{
    public readonly type: string = 'RefreshTokenToken';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'RefreshTokenToken',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}