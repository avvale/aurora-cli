import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonLangDir extends EnumValueObject
{
    public readonly type: string = 'CommonLangDir';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonLangDir',
            nullable   : false,
            undefinable: false,
            enumOptions: ['LTR','RTL'],
        }, validationRules));
    }
}