import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class LangName extends StringValueObject
{
    public readonly type: 'LangName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'LangName',
            nullable   : false,
            undefinable: false,
            
        }, validationRules));
    }
}