import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class LangIetf extends StringValueObject
{
    public readonly type: 'LangIetf';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'LangIetf',
            nullable   : false,
            undefinable: false,
            length     : 5,

        }, validationRules));
    }
}