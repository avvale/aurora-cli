import { JsonValueObject, ValidationRules } from '@aurora-ts/core';

export class AccountMeta extends JsonValueObject
{
    public readonly type: string = 'AccountMeta';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AccountMeta',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}