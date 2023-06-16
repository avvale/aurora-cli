import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonLangIso6392 extends StringValueObject
{
    public readonly type: string = 'LangIso6392';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'LangIso6392',
            nullable   : false,
            undefinable: false,
            length     : 2,
        }, validationRules));
    }
}