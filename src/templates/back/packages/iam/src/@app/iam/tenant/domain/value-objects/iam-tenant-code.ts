import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamTenantCode extends StringValueObject
{
    public readonly type: string = 'IamTenantCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'IamTenantCode',
            nullable   : true,
            undefinable: true,
            maxLength  : 63,
        }, validationRules));
    }
}