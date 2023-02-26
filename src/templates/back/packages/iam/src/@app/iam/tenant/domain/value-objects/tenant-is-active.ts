import { BooleanValueObject, DataValueObject, ValidationRules } from '@aurora-ts/core';

export class TenantIsActive extends BooleanValueObject
{
    public readonly type: string = 'TenantIsActive';

    constructor(value: boolean, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'TenantIsActive',
            nullable   : false,
            undefinable: false,
        }, validationRules), data);
    }
}