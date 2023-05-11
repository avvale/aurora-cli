import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AccountScopes extends JsonValueObject
{
    public readonly type: string = 'AccountScopes';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AccountScopes',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}