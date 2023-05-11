import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class UserName extends StringValueObject
{
    public readonly type: string = 'UserName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'UserName',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}