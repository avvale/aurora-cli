import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CountryI18NSlug extends StringValueObject
{
    public readonly type: 'CountryI18NSlug';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryI18NSlug',
            nullable   : false,
            undefinable: false,
            maxLength  : 1024,
        }, validationRules));
    }
}