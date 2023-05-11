import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AccountDTenants extends JsonValueObject
{
    public readonly type: string = 'AccountDTenants';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AccountDTenants',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}