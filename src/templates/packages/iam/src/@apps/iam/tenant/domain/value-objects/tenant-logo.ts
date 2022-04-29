import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class TenantLogo extends StringValueObject
{
    public readonly type: 'TenantLogo';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'TenantLogo',
            nullable   : true,
            undefinable: true,
            maxLength  : 255,
        }, validationRules));
    }
}