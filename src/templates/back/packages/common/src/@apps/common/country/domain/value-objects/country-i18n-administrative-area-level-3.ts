import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CountryI18nAdministrativeAreaLevel3 extends StringValueObject
{
    public readonly type: 'CountryI18nAdministrativeAreaLevel3';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryI18nAdministrativeAreaLevel3',
            nullable   : true,
            undefinable: true,
            maxLength  : 50,
        }, validationRules));
    }
}