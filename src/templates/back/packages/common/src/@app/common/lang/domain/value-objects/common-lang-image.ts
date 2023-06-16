import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonLangImage extends StringValueObject
{
    public readonly type: string = 'LangImage';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'LangImage',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}