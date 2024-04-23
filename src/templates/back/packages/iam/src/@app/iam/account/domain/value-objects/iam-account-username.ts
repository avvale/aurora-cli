import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamAccountUsername extends StringValueObject
{
    public readonly type: string = 'IamAccountUsername';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'IamAccountUsername',
            nullable   : false,
            undefinable: false,
            maxLength  : 128,
        }, validationRules));
    }
}