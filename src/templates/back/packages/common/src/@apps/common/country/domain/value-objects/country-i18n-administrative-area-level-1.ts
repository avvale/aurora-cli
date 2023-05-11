import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CountryI18NAdministrativeAreaLevel1 extends StringValueObject
{
    public readonly type: 'CountryI18NAdministrativeAreaLevel1';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryI18NAdministrativeAreaLevel1',
            nullable   : true,
            undefinable: true,
            maxLength  : 50,
        }, validationRules));
    }
}