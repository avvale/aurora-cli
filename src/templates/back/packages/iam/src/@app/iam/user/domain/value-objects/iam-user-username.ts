import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamUserUsername extends StringValueObject
{
    public readonly type: string = 'IamUserUsername';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'IamUserUsername',
            nullable   : false,
            undefinable: false,
            maxLength  : 120,
        }, validationRules));
    }
}