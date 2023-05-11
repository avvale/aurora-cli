import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AccountCode extends StringValueObject
{
    public readonly type: string = 'AccountCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AccountCode',
            nullable   : true,
            undefinable: true,
            maxLength  : 50,
        }, validationRules));
    }
}