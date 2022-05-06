import { JsonValueObject, ValidationRules } from 'aurora-ts-core';

export class AccountData extends JsonValueObject
{
    public readonly type: 'AccountData';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AccountData',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}