import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CountryI18nAdministrativeAreaLevel2 extends StringValueObject
{
    public readonly type: string = 'CountryI18nAdministrativeAreaLevel2';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryI18nAdministrativeAreaLevel2',
            nullable   : true,
            undefinable: true,
            maxLength  : 50,
        }, validationRules));
    }
}