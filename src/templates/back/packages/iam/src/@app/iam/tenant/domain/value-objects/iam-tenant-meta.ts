import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamTenantMeta extends JsonValueObject
{
    public readonly type: string = 'IamTenantMeta';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'IamTenantMeta',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}