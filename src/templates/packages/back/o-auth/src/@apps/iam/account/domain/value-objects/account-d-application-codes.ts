import { JsonValueObject, ValidationRules } from 'aurora-ts-core';

export class AccountDApplicationCodes extends JsonValueObject
{
    public readonly type: 'AccountDApplicationCodes';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AccountDApplicationCodes',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}