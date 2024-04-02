import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamBoundedContextRoot extends StringValueObject
{
    public readonly type: string = 'IamBoundedContextRoot';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'IamBoundedContextRoot',
            nullable   : false,
            undefinable: false,
            maxLength  : 64,
        }, validationRules));
    }
}