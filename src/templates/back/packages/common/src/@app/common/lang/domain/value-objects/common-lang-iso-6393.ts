import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonLangIso6393 extends StringValueObject
{
    public readonly type: string = 'CommonLangIso6393';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonLangIso6393',
            nullable   : false,
            undefinable: false,
            length     : 3,
        }, validationRules));
    }
}