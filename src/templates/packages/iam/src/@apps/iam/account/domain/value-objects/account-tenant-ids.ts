import { UuidArrayValueObject, ValidationRules } from 'aurora-ts-core';

export class AccountTenantIds extends UuidArrayValueObject
{
    public readonly type: 'AccountTenantIds';

    constructor(value: string[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AccountTenantIds',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}