import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamTenantName extends StringValueObject
{
    public readonly type: string = 'IamTenantName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'IamTenantName',
            nullable   : false,
            undefinable: false,
            maxLength  : 127,
        }, validationRules));
    }
}