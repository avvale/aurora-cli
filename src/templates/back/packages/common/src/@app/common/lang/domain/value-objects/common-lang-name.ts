import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonLangName extends StringValueObject
{
    public readonly type: string = 'CommonLangName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonLangName',
            nullable   : false,
            undefinable: false,
            maxLength  : 100,
        }, validationRules));
    }
}