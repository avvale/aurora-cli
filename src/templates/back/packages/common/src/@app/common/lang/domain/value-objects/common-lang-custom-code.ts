import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonLangCustomCode extends StringValueObject
{
    public readonly type: string = 'CommonLangCustomCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonLangCustomCode',
            nullable   : true,
            undefinable: true,
            maxLength  : 10,
        }, validationRules));
    }
}