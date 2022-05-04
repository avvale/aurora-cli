import { JsonValueObject, ValidationRules } from 'aurora-ts-core';

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