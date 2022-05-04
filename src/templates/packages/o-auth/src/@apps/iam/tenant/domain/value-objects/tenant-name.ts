import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class TenantName extends StringValueObject
{
    public readonly type: 'TenantName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'TenantName',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}