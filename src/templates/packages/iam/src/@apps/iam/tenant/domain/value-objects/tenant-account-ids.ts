import { UuidArrayValueObject, ValidationRules } from 'aurora-ts-core';

export class TenantAccountIds extends UuidArrayValueObject
{
    public readonly type: 'TenantAccountIds';

    constructor(value: string[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'TenantAccountIds',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}