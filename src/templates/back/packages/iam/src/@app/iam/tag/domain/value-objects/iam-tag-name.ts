import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamTagName extends StringValueObject
{
    public readonly type: string = 'IamTagName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'IamTagName',
            nullable   : false,
            undefinable: false,
            maxLength  : 64,
        }, validationRules));
    }
}