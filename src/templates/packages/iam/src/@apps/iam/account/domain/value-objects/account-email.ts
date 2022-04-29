import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class AccountEmail extends StringValueObject
{
    public readonly type: 'AccountEmail';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AccountEmail',
            nullable   : false,
            undefinable: false,
            maxLength  : 120,
        }, validationRules));
    }
}