import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class LangIso6393 extends StringValueObject
{
    public readonly type: 'LangIso6393';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'LangIso6393',
            nullable   : false,
            undefinable: false,
            length     : 3,

        }, validationRules));
    }
}