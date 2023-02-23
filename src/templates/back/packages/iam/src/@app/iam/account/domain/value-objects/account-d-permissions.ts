import { JsonValueObject, ValidationRules } from '@aurora-ts/core';

export class AccountDPermissions extends JsonValueObject
{
    public readonly type: string = 'AccountDPermissions';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AccountDPermissions',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}