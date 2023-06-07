import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CountryI18nSlug extends StringValueObject
{
    public readonly type: string = 'CountryI18nSlug';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryI18nSlug',
            nullable   : false,
            undefinable: false,
            maxLength  : 1024,
        }, validationRules));
    }
}