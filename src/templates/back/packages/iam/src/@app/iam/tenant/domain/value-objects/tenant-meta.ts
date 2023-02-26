import { JsonValueObject, ValidationRules } from '@aurora-ts/core';

export class TenantMeta extends JsonValueObject
{
    public readonly type: string = 'TenantMeta';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'TenantMeta',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}