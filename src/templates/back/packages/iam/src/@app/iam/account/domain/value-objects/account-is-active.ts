import { BooleanValueObject, DataValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AccountIsActive extends BooleanValueObject
{
    public readonly type: string = 'AccountIsActive';

    constructor(value: boolean, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AccountIsActive',
            nullable   : false,
            undefinable: false,
        }, validationRules), data);
    }
}