import { BooleanValueObject, ValidationRules } from 'aurora-ts-core';

export class AccountIsActive extends BooleanValueObject
{
    public readonly type: 'AccountIsActive';

    constructor(value: boolean, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AccountIsActive',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}