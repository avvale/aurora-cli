import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonLangName extends StringValueObject
{
    public readonly type: string = 'LangName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'LangName',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}