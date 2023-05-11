import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class UserCode extends StringValueObject
{
    public readonly type: 'UserCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'UserCode',
            nullable   : true,
            undefinable: true,
            maxLength  : 50,
        }, validationRules));
    }
}