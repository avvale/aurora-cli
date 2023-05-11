import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class LangDir extends EnumValueObject
{
    public readonly type: 'LangDir';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'LangDir',
            nullable   : false,
            undefinable: false,
            enumOptions: ['LTR','RTL'],
        }, validationRules));
    }
}