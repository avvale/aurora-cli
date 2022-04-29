import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class TenantCode extends StringValueObject
{
    public readonly type: 'TenantCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'TenantCode',
            nullable   : true,
            undefinable: true,
            maxLength  : 50,
        }, validationRules));
    }
}