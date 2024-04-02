import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamRoleName extends StringValueObject
{
    public readonly type: string = 'IamRoleName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'IamRoleName',
            nullable   : false,
            undefinable: false,
            maxLength  : 128,
        }, validationRules));
    }
}