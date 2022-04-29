import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class UserSurname extends StringValueObject
{
    public readonly type: 'UserSurname';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'UserSurname',
            nullable   : true,
            undefinable: true,
            maxLength  : 255,
        }, validationRules));
    }
}