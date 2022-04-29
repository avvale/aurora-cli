import { BooleanValueObject, ValidationRules } from 'aurora-ts-core';

export class TenantIsActive extends BooleanValueObject
{
    public readonly type: 'TenantIsActive';

    constructor(value: boolean, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'TenantIsActive',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}