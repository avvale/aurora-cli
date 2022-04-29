import { EnumValueObject, ValidationRules } from 'aurora-ts-core';

export class AccountType extends EnumValueObject
{
    public readonly type: 'AccountType';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AccountType',
            nullable   : false,
            undefinable: false,
            enumOptions: ['USER','SERVICE'],
        }, validationRules));
    }
}