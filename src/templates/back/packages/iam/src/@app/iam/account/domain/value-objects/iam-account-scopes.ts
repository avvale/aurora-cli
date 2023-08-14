import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamAccountScopes extends JsonValueObject
{
    public readonly type: string = 'IamAccountScopes';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'IamAccountScopes',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}