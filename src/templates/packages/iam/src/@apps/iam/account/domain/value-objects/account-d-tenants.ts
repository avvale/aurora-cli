import { JsonValueObject, ValidationRules } from 'aurora-ts-core';

export class AccountDTenants extends JsonValueObject
{
    public readonly type: 'AccountDTenants';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AccountDTenants',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}