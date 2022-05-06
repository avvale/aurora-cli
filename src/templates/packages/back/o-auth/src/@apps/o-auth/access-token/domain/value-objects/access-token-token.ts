import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class AccessTokenToken extends StringValueObject
{
    public readonly type: 'AccessTokenToken';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AccessTokenToken',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}