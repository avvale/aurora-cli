import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ApplicationCode extends StringValueObject
{
    public readonly type: string = 'ApplicationCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ApplicationCode',
            nullable   : false,
            undefinable: false,
            maxLength  : 50,
        }, validationRules));
    }
}