import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class AccountCode extends StringValueObject
{
    public readonly type: 'AccountCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AccountCode',
            nullable   : true,
            undefinable: true,
            maxLength  : 50,
        }, validationRules));
    }
}