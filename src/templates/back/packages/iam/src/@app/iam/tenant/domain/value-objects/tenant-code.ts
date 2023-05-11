import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class TenantCode extends StringValueObject
{
    public readonly type: string = 'TenantCode';

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