import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CountryI18nName extends StringValueObject
{
    public readonly type: string = 'CountryI18nName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryI18nName',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}