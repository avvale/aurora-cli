import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AccountEmail extends StringValueObject
{
    public readonly type: string = 'AccountEmail';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AccountEmail',
            nullable   : false,
            undefinable: false,
            maxLength  : 120,
        }, validationRules));
    }
}