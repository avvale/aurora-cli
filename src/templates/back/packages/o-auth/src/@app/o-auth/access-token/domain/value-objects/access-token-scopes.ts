import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AccessTokenScopes extends JsonValueObject
{
    public readonly type: 'AccessTokenScopes';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AccessTokenScopes',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}