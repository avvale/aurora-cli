import { JsonValueObject, ValidationRules } from 'aurora-ts-core';

export class TenantData extends JsonValueObject
{
    public readonly type: 'TenantData';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'TenantData',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}