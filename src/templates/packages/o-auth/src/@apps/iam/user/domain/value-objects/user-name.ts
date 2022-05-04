import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class UserName extends StringValueObject
{
    public readonly type: 'UserName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'UserName',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}