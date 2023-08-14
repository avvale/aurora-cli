import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamBoundedContextName extends StringValueObject
{
    public readonly type: string = 'IamBoundedContextName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'IamBoundedContextName',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}