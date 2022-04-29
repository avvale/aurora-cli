import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class LangCustomCode extends StringValueObject
{
    public readonly type: 'LangCustomCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'LangCustomCode',
            nullable   : true,
            undefinable: true,
            maxLength  : 10,
        }, validationRules));
    }
}