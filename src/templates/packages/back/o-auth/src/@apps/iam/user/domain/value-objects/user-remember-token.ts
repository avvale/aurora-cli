import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class UserRememberToken extends StringValueObject
{
    public readonly type: 'UserRememberToken';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'UserRememberToken',
            nullable   : true,
            undefinable: true,
            maxLength  : 255,
        }, validationRules));
    }
}