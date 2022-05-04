import { JsonValueObject, ValidationRules } from 'aurora-ts-core';

export class AccountDScopes extends JsonValueObject
{
    public readonly type: 'AccountDScopes';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AccountDScopes',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}