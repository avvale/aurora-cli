import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ApplicationName extends StringValueObject
{
    public readonly type: string = 'ApplicationName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ApplicationName',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}